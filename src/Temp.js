import React, { useState, useEffect } from "react";
import Weather from "./Weather";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo , setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid={your key}`;

      const res = await fetch(url);
      const data = await res.json();

      const {temp,humidity,pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country , sunset} = data.sys;
      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      }
      setTempInfo(newWeatherInfo);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weather tempInfo={tempInfo}/>
    </div>
  );
};

export default Temp;
