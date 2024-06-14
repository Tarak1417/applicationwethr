import React from "react";

function CityComponent(props) {
  const { setCity, searchHandler, validCity } = props;
  return (
    <div className="container">
      <span className="title">React Weather App</span>
      <img
      
        className="image"
        src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
        alt="Error"
      ></img>
      <div className="form">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button onClick={searchHandler}>Search</button>
      </div>
      {validCity ? (
        <></>
      ) : (
        <span className="validation">Please enter valid city name</span>
      )}
    </div>
  );
}

export default CityComponent;
