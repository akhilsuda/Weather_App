import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import WeatherComponent from "./modules/WeatherInfoComponent";


export const WeatherIcons = {
  "01d": "/react-weather-app/icons/sunny.svg",
  "01n": "/react-weather-app/icons/night.svg",
  "02d": "/react-weather-app/icons/day.svg",
  "02n": "/react-weather-app/icons/cloudy-night.svg",
  "03d": "/react-weather-app/icons/cloudy.svg",
  "03n": "/react-weather-app/icons/cloudy.svg",
  "04d": "/react-weather-app/icons/perfect-day.svg",
  "04n": "/react-weather-app/icons/cloudy-night.svg",
  "09d": "/react-weather-app/icons/rain.svg",
  "09n": "/react-weather-app/icons/rain-night.svg",
  "10d": "/react-weather-app/icons/rain.svg",
  "10n": "/react-weather-app/icons/rain-night.svg",
  "11d": "/react-weather-app/icons/storm.svg",
  "11n": "/react-weather-app/icons/storm.svg",
};

const Container = styled.div`

`;


const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

function App() {
  const [city, updateCity] = useState('ottawa');;
  const [weather, updateWeather] = useState();
  const updateCityValue = (city) => {
    updateCity(city);
  }
  const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c0cbc8e175a0340c000935a398edc400`;
    return await Axios.get(url).catch((err) => {
      console.error('ERROR::: While fetching Weather Data :::>>', err)
      return err
    })
  }

  const getData = async () => {
    const response = await getWeatherData();
    updateWeather(response.data);
  }
  useEffect(() => {
    getData()
}, [city])


  return (
    <Container>
     <WeatherComponent weather={weather} updateCityValue={updateCityValue} />
    </Container>
  );
}

export default App;
