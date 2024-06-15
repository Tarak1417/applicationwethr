import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import CityComponent from "./CityComponent";
import WeatherComponent from "./WeatherComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #36d1dc, #5b86e5);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const AppTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [validCity, setValidCity] = useState(true);

  const searchHandler = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY || "your_default_api_key";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      
      localStorage.setItem(data.name, JSON.stringify(data));
      setWeatherDetails(data);
      setValidCity(true);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setValidCity(false);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  return (
   
    <Container>
      
      <AppTitle >Weather App</AppTitle>
      {weatherDetails ? (
        <WeatherComponent weatherDetails={weatherDetails} />
      ) : (
        <CityComponent
          city={city}
          onCityChange={handleCityChange}
          onSearch={searchHandler}
          onKeyPress={handleKeyPress}
          validCity={validCity}
        />
      )}
    </Container>
  );
}


export default WeatherApp;
