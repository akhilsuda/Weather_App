import React, {useRef} from "react";
import styled from "styled-components";
import {WeatherIcons} from "../App";
import moment from "moment";

export const WeatherInfoIcons = {
    sunset: "/react-weather-app/icons/temp.svg",
    sunrise: "/react-weather-app/icons/temp.svg",
    humidity: "/react-weather-app/icons/humidity.svg",
    wind: "/react-weather-app/icons/wind.svg",
    pressure: "/react-weather-app/icons/pressure.svg",
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
  flex-direction: column;
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
const TestDiv1 = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width:100%;
border: 2px solid white;

`;

const TestDiv2 = styled.div`
border: 1px solid #EEF6FB;
width: 25%;
border: 2px solid white;
border-radius: 8px;
background: linear-gradient(#EEF6FB ,#EEF6FB);
`;

const CityDivContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
margin-right: 410px;
margin-left: 410px;
margin-bottom:11px;
font-size: 30px;

`;

const City = styled.div`
box-shadow: 5px 3px 6px 5px #EEF6FB;
padding: 20px;
cursor:pointer;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 76%;
  padding: 3px 3px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
  margin-bottom: 100px;
  background: white;

`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;


const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    );
};
const WeatherComponent = (props) => {
    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const {weather,updateCityValue } = props;
    const isDay = weather ? weather.list[0].weather[0].icon.includes('d') : false
    const fourDayData = weather? weather.list.slice(1, 5) : []
    const nameOfDay = weather ? moment(weather.list[0].dt_txt): moment()
    const nameOfLocalDay=nameOfDay.localeData().weekdaysShort()
    console.log(fourDayData)
    console.log(nameOfDay)
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
       <CityDivContainer>
       <City  ref={textInput1} onClick={() => {
           textInput1.current.style.color = 'lightBlue'
           textInput2.current.style.color = 'black'
           textInput3.current.style.color = 'black'
           updateCityValue('ottawa')
         }}>
        OTTAWA
       </City>

       <City ref={textInput2} onClick={() => {
           textInput1.current.style.color = 'black'
           textInput2.current.style.color = 'lightBlue'
           textInput3.current.style.color = 'black'
           updateCityValue('moscow')
         }}>
         MOSCOW
       </City>

       <City ref={textInput3} onClick={() => {
           textInput1.current.style.color = 'black'
           textInput2.current.style.color = 'black'
           textInput3.current.style.color = 'lightBlue'
           updateCityValue('tokyo')
         }}>
         TOKYO
      </City>
       </CityDivContainer>
       <Container>
          <div className="today_weather">
            <WeatherContainer>
            <WeatherIcon src={WeatherIcons[weather?.list[0].weather[0].icon]}/>
                <Condition>
                    <span>{`${Math.floor(weather?.list[0].main?.temp - 273)}°C`}</span>
                  {/*`  |  ${weather?.list[0].weather[0].description}`*/}
                </Condition>

            </WeatherContainer>
          </div>


            <TestDiv1>

           {fourDayData && fourDayData.map((data, idx) => {
             return (
              <TestDiv2>
                <div className="day-container">{nameOfLocalDay[moment(data?.dt_txt).day()]}</div>
              <WeatherContainer>
              <WeatherIcon src={WeatherIcons[data?.weather[0].icon]}/>
                <Condition>
                    <span>{`${Math.floor(data?.main?.temp - 273)}°C`}</span>
                  {/*`  |  ${data?.weather[0].description}`*/}
                </Condition>

            </WeatherContainer>
              </TestDiv2>
             )

           })}

            </TestDiv1>
            </Container>

        </>
    );
};

export default WeatherComponent;
