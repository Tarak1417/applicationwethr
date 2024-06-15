import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FavoritesContainer = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const FavoriteCity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CityName = styled.span`
  font-size: 18px;
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const FavoritesComponent = ({ onRemoveFavorite }) => {
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    // Fetch favorite cities from localStorage on component mount
    const fetchFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
      setFavoriteCities(favorites);
    };

    fetchFavorites();
  }, []);

  const handleRemove = (cityName) => {
    // Remove city from favorites
    const updatedFavorites = favoriteCities.filter(city => city !== cityName);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));

    // Notify parent component about the removal
    onRemoveFavorite(cityName);
  };

  return (
    <FavoritesContainer>
      <h2>Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p>No favorite cities added yet.</p>
      ) : (
        favoriteCities.map((cityName, index) => (
          <FavoriteCity key={index}>
            <CityName>{cityName}</CityName>
            <RemoveButton onClick={() => handleRemove(cityName)}>
              Remove
            </RemoveButton>
          </FavoriteCity>
        ))
      )}
    </FavoritesContainer>
  );
};

export default FavoritesComponent;
