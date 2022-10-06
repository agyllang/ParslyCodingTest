import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/navbar";

const API_KEY = process.env.REACT_APP_API_KEY;
// console.log("api key", API_KEY);

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("state data:", data);

  useEffect(() => {
    const fetchWeatherData = async (lat = 59.3294, lon = 18.0686) => {
      // var url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`;
      var url = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=2021-06-01&end_date=2021-06-20&key=${API_KEY}`;

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

    fetchWeatherData();
  }, []);
  return (
    <div className="App">
      <NavBar />
      Hello world
    </div>
  );
};

export default App;
