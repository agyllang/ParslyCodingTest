import React, { useEffect, useState, useRef } from "react";

import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/navbar";
import LineChartGraph from "./components/lineChart";
import DataList from "./components/dataList";
import EventList from "./components/eventList";
const API_KEY = process.env.REACT_APP_API_KEY;
// console.log("api key", API_KEY);
const timestampConvert = (UNIX_timestamp) => {
  var dateformat8601 = new Date(UNIX_timestamp).toISOString().slice(0, 10);

  return dateformat8601;
};

const severityCalculator = (val, comparator, medianComparator) => {
  //function calculate the offset of a value from a certain interval
  var difference = Math.abs(comparator - val);
  var fraction = difference / medianComparator;
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
  // const [data, setData] = useState([
  //   {
  //     rh: 70.2,
  //     wind_spd: 3.8,
  //     max_wind_spd: 6.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 30,
  //     max_uv: 5,
  //     datetime: "2022-10-08",
  //     temp: 25.86,
  //     min_temp: 23,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 30.2,
  //     wind_spd: 3.8,
  //     max_wind_spd: 6.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 32,
  //     max_uv: 5,
  //     datetime: "2022-10-09",
  //     temp: 27.86,
  //     min_temp: 20,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-10",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-11",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-12",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-13",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-15",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-16",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-17",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-17",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-18",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  //   {
  //     rh: 50.2,
  //     wind_spd: 4.8,
  //     max_wind_spd: 5.7,
  //     min_temp_ts: 1483272000,
  //     max_temp_ts: 1483308000,
  //     dewpt: 1.8,
  //     max_temp: 20,
  //     max_uv: 5,
  //     datetime: "2022-10-14",
  //     temp: 17.86,
  //     min_temp: 5,
  //     ts: 1483228800,
  //   },
  // ]);
  console.log("state data:", data);
  const [events, setEvents] = useState([]);

  // limit for data values
  const [tempMax, setTempMax] = useState(30);
  const [tempMin, setTempMin] = useState(15);

  const [humidMax, setHumidMax] = useState(80);
  const [humidMin, setHumidMin] = useState(50);

  const [wndSpdMax, setWSPDMax] = useState(5);
  const [wndSpdMin, setWSPDMin] = useState(1);

  console.log("events", events);

  //timestamp reference which increases every interval loop, used to fetch data from one day later
  // 1622592060000= 2021-06-01
  // const increasingTS = useRef(1622592060000);
  const oldTS = useRef(1622505660000);
  const newTS = useRef(1622592060000);
  // console.log(increasingTS.current);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async (startDate, endDate) => {
      // var url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`;
      // var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=2021-06-01&end_date=2021-07-20&key=${API_KEY}`;
      var lat = 59.3294;
      var lon = 18.0686;
      var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let data = await response.json();
        setData((prevState) => [...prevState, data.data[0]]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
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
      var tempCheck = checkDataSeverity(
        "Temperature",
        recentData.temp,
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

      var checkedProperties = [tempCheck, humidityCheck, windCheck];
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
      <Row>
        <Col md={6}>
          <LineChartGraph data={data} tempMax={tempMax} tempMin={tempMin} />
        </Col>
        <Col md={6}>
          <DataList data={data} />
        </Col>
      </Row>
      <Row>
        <EventList events={events} />
      </Row>
    </div>
  );
};

export default App;
