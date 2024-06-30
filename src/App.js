import React, { useState } from "react";
import axios from "axios";
// import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=669b1abac70311cf800b8a9d11d19259`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setError('');
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('City not found. Please enter a valid city name.');
        } else {
          setError('An error occurred. Please try again.');
        }
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter any City Name"
          type="text"
        />
      </div>
      {error && <p className="error">{error}</p>} 
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p> {data.main.feels_like}C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>

          <div className="wind">
            {data.wind ? <p>{data.wind.speed} mph</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
