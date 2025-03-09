import React, { useState } from "react";
import "./Weather.css";

const api = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  key: "b90b52c67bb988d484f429910c61ae76",
};

// Define Weather Data Type
interface WeatherData {
  name?: string;
  main?: { temp: number };
  weather?: { main: string }[];
  clouds?: { all: number };
  wind?: { gust: number };
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({});
  const [search, setSearch] = useState("");

  function handleSearch() {
    fetch(`${api.baseUrl}?q=${search}&appid=${api.key}`)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }

  return (
    <div className="one">
      <br />
      <input
        placeholder="Search City"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="wind1">
        <img
          src="https://img.freepik.com/premium-vector/wave-logo-vector-art-icons-graphics_1278706-90916.jpg?w=1060"
          alt="Weather Icon"
        />
      </div>

      {weather.main ? (
        <div className="text">
          <p>{weather.name}</p>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather?.[0]?.main}</p>
          <p>{weather.clouds?.all}% Cloud Coverage</p>
          <p className="wind">{weather.wind?.gust} km/h Wind Gust</p>
        </div>
      ) : (
        <p className="p">Not Found</p>
      )}
    </div>
  );
};

export default Weather;
