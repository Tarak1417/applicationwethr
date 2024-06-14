import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { WeatherIcons } from "./weatherIcons";

export const WeatherInfoIcons = {
  sunset: "https://cdn-icons-png.flaticon.com/512/2924/2924900.png",
  sunrise: "https://cdn-icons-png.flaticon.com/512/7246/7246563.png",
  humidity: "https://cdn-icons-png.flaticon.com/512/728/728093.png",
  wind: "https://cdn-icons-png.flaticon.com/512/1506/1506761.png",
  pressure: "https://cdn-icons-png.flaticon.com/512/4115/4115904.png",
};

const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;

const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;

const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;

const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoContainer = styled.div`
  display: flex;
  
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

;

const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const ForecastContainer = styled.div`
  margin-top: 30px;
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 120px;
`;

const DateLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TemperatureLabel = styled.span`
  font-size: 16px;
`;
const WeatherComponent = (props) => {
  const { weatherDetails } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const favoriteLocations =
      JSON.parse(localStorage.getItem("favoriteLocations")) || [];
    const isLocationFavorite = favoriteLocations.some(
      (loc) =>
        loc.name === weatherDetails?.name && loc.country === weatherDetails?.sys?.country
    );
    setIsFavorite(isLocationFavorite);

    const fetchForecast = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY || "your_default_api_key";
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${weatherDetails?.name},${weatherDetails?.sys?.country}&units=metric&appid=${apiKey}`
        );
        console.log("Forecast Response:", forecastResponse.data);
        setForecastData(forecastResponse.data.list);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    if (weatherDetails) {
      fetchForecast();
    }
  }, [weatherDetails]);

  const toggleFavorite = () => {
    const favoriteLocations =
      JSON.parse(localStorage.getItem("favoriteLocations")) || [];
    const existingIndex = favoriteLocations.findIndex(
      (loc) =>
        loc.name === weatherDetails?.name &&
        loc.country === weatherDetails?.sys?.country
    );

    if (existingIndex === -1) {
      favoriteLocations.push({
        name: weatherDetails?.name,
        country: weatherDetails?.sys?.country,
      });
      setIsFavorite(true);
    } else {
      favoriteLocations.splice(existingIndex, 1);
      setIsFavorite(false);
    }

    localStorage.setItem("favoriteLocations", JSON.stringify(favoriteLocations));
  };

  return (
    <>
      <div className="container">
        <WeatherContainer>
          <Condition>
            <span>{`${Math.floor(weatherDetails?.main?.temp)}°C`}</span>
            {`  |  ${weatherDetails?.weather[0].description}`}
          </Condition>
          <WeatherIcon src={WeatherIcons[weatherDetails?.weather[0].icon]} />
        </WeatherContainer>
        <Location>{`${weatherDetails?.name}, ${weatherDetails?.sys?.country}`}</Location>

        <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
        <WeatherInfoContainer>
          {/* Weather info components here */}
        </WeatherInfoContainer>

        <ForecastContainer>
          <WeatherInfoLabel>5-Day Forecast</WeatherInfoLabel>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {forecastData.slice(0, 5).map((forecast) => (
              <ForecastItem key={forecast.dt}>
                {/* Forecast item details here */}
              </ForecastItem>
            ))}
          </div>
        </ForecastContainer>

        <button className="back-button" onClick={() => window.history.go()}>
          Go back
        </button>

        <button className="back-button" onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </>
  );
};

export default WeatherComponent;
