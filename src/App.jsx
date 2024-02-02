import React, { useState } from "react";
import Search from "./componets/search/Search";
import CurrentWeather from "./componets/currentWeather/CurrentWeather";
import { EXPORT_WEATHER_URL } from "./componets/Api";
import { EXPORT_WEATHER_API_KEY } from "./componets/Api";
import Forecast from "./componets/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${EXPORT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${EXPORT_WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${EXPORT_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${EXPORT_WEATHER_API_KEY}&units=metric`
    );

    //data promise
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
