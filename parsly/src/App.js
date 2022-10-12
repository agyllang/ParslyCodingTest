import React, { useEffect, useState,useRef } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import LineChartGraph from "./components/lineChart";

const API_KEY = process.env.REACT_APP_API_KEY;
// console.log("api key", API_KEY);
const timestampConvert = (UNIX_timestamp) => {

  var dateformat8601 = new Date(UNIX_timestamp).toISOString().slice(0, 10);

  return dateformat8601;
};

const App = () => {
  const [data, setData] = useState([]);
  console.log("state data:", data);

  //timestamp reference which increases every interval loop, used to fetch data from one day later
  // 1622592060000= 2021-06-01
  const increasingTS = useRef(1622592060000)
  console.log(increasingTS.current)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async (endDate) => {
      // var url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`;
      // var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=2021-06-01&end_date=2021-07-20&key=${API_KEY}`;

      var lat = 59.3294;
      var lon = 18.0686;

      var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=2021-06-01&end_date=${endDate}&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let data = await response.json();
        setData(data.data);

        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    const interval = setInterval(() => {

      increasingTS.current+=86400000;
      //86400000 = one day

      var endDate = timestampConvert(increasingTS.current);
      fetchWeatherData(endDate);
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <NavBar />
      <LineChartGraph data={data} />
      Hello world
    </div>
  );
};

export default App;
