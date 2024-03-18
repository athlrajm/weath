import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
    let api_key = "e209dd8200e2377f47bf03e032f78339";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        const cityName = element.value.trim();

        if (!cityName) {
            console.error("Please enter a city name.");
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.cod === "404") {
                console.error("City not found. Please enter a valid city name.");
                return;
            }

            const humidity = document.getElementsByClassName("humidity-percentage");
            const wind = document.getElementsByClassName("wind-rate");
            const temprature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + " km/h";
            temprature[0].innerHTML = data.main.temp + "°C";
            location[0].innerHTML = data.name;

            
            switch (data.weather[0].icon) {
                case "01d":
                case "01n":
                    setWicon(clear_icon);
                    break;
                case "02d":
                case "02n":
                    setWicon(cloud_icon);
                    break;
                case "03d":
                case "03n":
                    setWicon(drizzle_icon);
                    break;
                case "04d":
                case "04n":
                    setWicon(drizzle_icon);
                    break;
                case "09d":
                case "09n":
                    setWicon(rain_icon);
                    break;
                case "10d":
                case "10n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='search' />
                <div className='search-icon' onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt="weather icon" />
            </div>
            <div className='weather-temp'>24 °C</div>
            <div className='weather-location'>London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percentage">65%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 Km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
