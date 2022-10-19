import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import { timestampConvert } from "./components/utilities";

import NavBar from "./components/navbar";
import Graphs from "./components/graphs";
import DataList from "./components/dataList";
import EventList from "./components/eventList";

const API_KEY = process.env.REACT_APP_API_KEY;

const severityCalculator = (val, limit, median) => {
  //function calculate the offset of a value from a certain interval
  var difference = Math.abs(limit - val);
  var fraction = difference / median;
  var roundUp = Math.abs(Math.round((fraction + Number.EPSILON) * 100) / 100);
  return roundUp;
};
const severityToText = (val) => {
  var text = "Warning";
  if (val > 0.3) text = "Critical";
  else if (val > 0.15) text = "Error";
  return text;
};

const checkDataSeverity = (property, val, lowerLimit, upperLimit) => {
  var message = "";
  var severityStatus = false;
  var severityValue = "";
  switch (true) {
    case val < lowerLimit:
      message = `${property}-value is too low for Parsley to propsper`;
      severityStatus = true;
      severityValue = severityCalculator(
        val,
        lowerLimit,
        (Math.abs(lowerLimit) + Math.abs(upperLimit)) / 2
      );
      break;
    case val > upperLimit:
      message = `${property}-value is too high for Parsley to propsper`;
      severityStatus = true;
      severityValue = severityCalculator(
        val,
        upperLimit,
        (Math.abs(lowerLimit) + Math.abs(upperLimit)) / 2
      );

      break;
    case val >= lowerLimit && val <= upperLimit:
      message = `${property}-value ok`;
      severityStatus = false;
      break;
    default:
      message = "No value found";
  }
  return {
    message: message,
    property: property,
    severityStatus: severityStatus,
    severityValue: severityValue,
    dataValue: val,
    limits: { min: lowerLimit, max: upperLimit },
  };
};

const App = () => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  // limit for data values, used for triggering events
  const tempMin = 15,
    tempMax = 30;

  const humidMin = 50,
    humidMax = 80;

  const wndSpdMin = 1,
    wndSpdMax = 5;

  //timestamp reference which increases every interval loop, used to fetch data from one day later
  // 1622592060000= 2021-06-01
  const oldTS = useRef(1622505660000);
  const newTS = useRef(1622592060000);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (startDate, endDate) => {
      var lat = 59.3294;
      var lon = 18.0686;
      //lat,lon for Stockholm
      var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        var data = await response.json();

        data.data[0].tempChange = [
          data.data[0].min_temp,
          data.data[0].max_temp,
        ];
        setData((prevState) => [...prevState, data.data[0]]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
      }
    };
    const interval = setInterval(() => {
      // increasingTS.current+=86400000;
      //86400000 = one day
      oldTS.current += 86400000;
      var startDate = timestampConvert(oldTS.current);

      newTS.current += 86400000;
      var endDate = timestampConvert(newTS.current);

      fetchWeatherData(startDate, endDate);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      var recentData = [...data].pop();
      // var tempCheck = checkDataSeverity(
      //   "Temperature",
      //   recentData.temp,
      //   tempMin,
      //   tempMax
      // );
      var minTempCheck = checkDataSeverity(
        "Daily min temperature",
        recentData.min_temp,
        tempMin,
        tempMax
      );
      var maxTempCheck = checkDataSeverity(
        "Daily max temperature",
        recentData.max_temp,
        tempMin,
        tempMax
      );
      var humidityCheck = checkDataSeverity(
        "Humidity",
        recentData.rh,
        humidMin,
        humidMax
      );
      var windCheck = checkDataSeverity(
        "Wind speed",
        recentData.wind_spd,
        wndSpdMin,
        wndSpdMax
      );

      var checkedProperties = [
        minTempCheck,
        maxTempCheck,
        humidityCheck,
        windCheck,
      ];
      //filtering data based on severity
      var severityArray = checkedProperties.filter((i) => {
        return i.severityStatus === true;
      });

      // create event object(s)
      var eventArray = severityArray.map((i) => {
        var eventObj = {};
        eventObj.eventName = `${i.property}-event`;
        eventObj.eventDetail = `${i.message}`;
        eventObj.eventTimeDate = timestampConvert(new Date().getTime());
        eventObj.eventTS = new Date().getTime();
        eventObj.severityValue = i.severityValue;
        eventObj.severity = severityToText(i.severityValue);
        eventObj.dataValue = i.dataValue;
        eventObj.dataProperty = i.property;
        eventObj.limits = i.limits;
        return eventObj;
      });

      // populate event state
      eventArray.length > 0 &&
        eventArray.forEach((e) =>
          setEvents((prevState) => [
            ...prevState,
            {
              event: {
                eventData: e,
                data: recentData,
                dataDateTime: recentData.datetime,
                created: new Date().getTime(),
              },
            },
          ])
        );
    }
  }, [data]);

  return (
    <div className="App">
      <NavBar />
      {error != null && error.length > 0 && <div> {error}</div>}
      <Container fluid>
        <Row>
          <Col lg={8} md={6} xs={{ span: 12 }}>
            <Graphs
              data={data}
              tempMax={tempMax}
              tempMin={tempMin}
              humidMax={humidMax}
              humidMin={humidMin}
              wndSpdMax={wndSpdMax}
            />
          </Col>
          <Col lg={4} md={6}>
            <EventList events={events} />
            <DataList data={data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
