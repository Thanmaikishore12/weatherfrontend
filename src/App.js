// ✅ All imports MUST be at the top
import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorBanner from "./components/ErrorBanner";

const API_KEY = "018d889fbc427671c72140f1d39ce9bc";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found. Try again!");
        setWeatherData(null);
        return;
      }
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className={`app theme-${getTheme(weatherData?.weather?.[0]?.main)}`}>
      <div className="container">
        <h1 className="title">WeatherNow 🌤️</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <ErrorBanner message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

// helper: change theme based on weather
function getTheme(condition = "Sunny") {
  condition = condition.toLowerCase();
  if (condition.includes("rain")) return "rainy";
  if (condition.includes("cloud")) return "cloudy";
  return "sunny";
}

export default App;
