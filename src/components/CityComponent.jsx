import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 10px;
  width: 100%;
  border: 2px solid #fff;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5b86e5;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #5b86e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a69bd;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  font-size: 0.9rem;
  margin-top: 5px;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CityComponent = ({ city, onCityChange, onSearch, onKeyPress, validCity }) => {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
      <Input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={onCityChange}
        onKeyPress={onKeyPress}
      />
      <Button type="submit">Search</Button>
      {!validCity && <ErrorMessage>City not found. Please try again.</ErrorMessage>}
    </Form>
  );
};

export default CityComponent;
