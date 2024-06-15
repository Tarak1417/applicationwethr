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



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background: #f0f0f0;
  border-radius: 12px;
  background: linear-gradient(to bottom, #36d1dc, #5b86e5);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

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
`;

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
  width: 100%;
`;
const BackButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
   transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 10px 20px;
`;

const FavoriteButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: ${props => (props.isFavorite ? "#dc3545" : "#28a745")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.isFavorite ? "#c82333" : "#218838")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;





const ForecastGrid = styled.div`
  display: grid;
  
  

  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    
  }
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-width:1px;
  border-style:solid;
  border-color:rgb(53, 52, 52);
`;

const DateLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TemperatureLabel = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Description = styled.span`
  font-size: 12px;
  color: #555;
  margin-bottom: 5px;
  text-transform: capitalize;
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <Container>
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
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons["sunrise"]} />
          <InfoLabel>
            {formatTime(weatherDetails?.sys?.sunrise)}
            <span>Sunrise</span>
          </InfoLabel>
        </InfoContainer>
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons["sunset"]} />
          <InfoLabel>
            {formatTime(weatherDetails?.sys?.sunset)}
            <span>Sunset</span>
          </InfoLabel>
        </InfoContainer>
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons["humidity"]} />
          <InfoLabel>
            {weatherDetails?.main?.humidity}%
            <span>Humidity</span>
          </InfoLabel>
        </InfoContainer>
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons["wind"]} />
          <InfoLabel>
            {weatherDetails?.wind?.speed} m/s
            <span>Wind</span>
          </InfoLabel>
        </InfoContainer>
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons["pressure"]} />
          <InfoLabel>
            {weatherDetails?.main?.pressure} hPa
            <span>Pressure</span>
          </InfoLabel>
        </InfoContainer>
      </WeatherInfoContainer>

      <ForecastContainer>
        <WeatherInfoLabel>5-Day Forecast</WeatherInfoLabel>
        <ForecastGrid>
          {forecastData
            .filter((_, index) => index % 8 === 0) // Filter to get data for every 24 hours
            .map((forecast) => (
              <ForecastItem key={forecast.dt}>
                <DateLabel>{formatDate(forecast.dt)}</DateLabel>
                <WeatherIcon src={WeatherIcons[forecast.weather[0].icon]} />
                <TemperatureLabel>{`${Math.floor(forecast.main.temp)}°C`}</TemperatureLabel>
                <Description>{forecast.weather[0].description}</Description>
              </ForecastItem>
            ))}
        </ForecastGrid>
      </ForecastContainer>

      <button className="back-button" onClick={() => window.history.go()}>
        Go back
      </button>
      

      <button className="back-button" onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </Container>
  );
};

export default WeatherComponent;
