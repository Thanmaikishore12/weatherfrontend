import React from "react";

function WeatherCard({ data }) {
  const { name, sys, main, weather } = data;
  const condition = weather[0].main;
  const temp = Math.round(main.temp);
  const feels = Math.round(main.feels_like);
  const humidity = main.humidity;

  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
  };

  return (
    <div className="weather-card">
      <h2>
        📍 {name}, {sys.country}
      </h2>
      <div className="temp">
        <span className="temp-value">{temp}°C</span>
        <span className="icon">{icons[condition] || "🌤️"}</span>
      </div>
      <p>
        <strong>Condition:</strong> {condition}
      </p>
      <p>
        <strong>Feels Like:</strong> {feels}°C
      </p>
      <p>
        <strong>Humidity:</strong> {humidity}%
      </p>
    </div>
  );
}

export default WeatherCard;
