import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import SevenDay from './components/SevenDay';
import './style.css';
import { Routes, Route } from 'react-router-dom';
import zips from './components/Zips';
import uniqid from 'uniqid';
import DailyCard from './components/DailyCard';

const App = () => {
  const [currentJson, setCurrentJson] = useState([]);
  const [sevenDay, setSevenDay] = useState([]);
  const [zip, setZip] = useState(
    Math.floor(parseInt(zips[Math.floor(Math.random() * zips.length)]) || null)
  );
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geo, setGeo] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [sun, setSun] = useState([]);
  const date = new Date();
  useEffect(() => {
    getWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setZip(document.getElementById('zipcode').value);
    getWeather();
  };

  const handleChange = (e) => {
    setZip(e.target.value);
  };

  const apiValueBasic = () =>
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=53dcc962829731a4fa033950e8997254`;

  const apiValueComprehensive = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;

  const geocode = (lat, lon) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=53dcc962829731a4fa033950e8997254`;

  async function getWeather() {
    setLoading(true);
    try {
      //getting api values
      const basicData = await fetch(apiValueBasic(), { mode: 'cors' });
      const basicJson = await basicData.json();
      const advancedData = await fetch(
        apiValueComprehensive(basicJson.coord.lat, basicJson.coord.lon)
      );
      const advancedJson = await advancedData.json();
      const geocodeData = await fetch(
        geocode(basicJson.coord.lat, basicJson.coord.lon)
      );
      const geoCodeJson = await geocodeData.json();

      //sorting api values into arrays to be set into states
      let sevenDayArr = [];
      let hourlyArr = [];
      let sunArr = [];
      for (let i = 0; i < 24; i++) {
        hourlyArr.push({
          temp: Math.floor(advancedJson.hourly[i].temp),
          time: new Date(advancedJson.hourly[i].dt * 1000),
          icon: `https://openweathermap.org/img/w/${advancedJson.hourly[i].weather[0].icon}.png`,
        });
      }

      for (let i = 0; i < 7; i++) {
        sevenDayArr.push({
          date: new Date(advancedJson.daily[i].dt * 1000),
          icon: `https://openweathermap.org/img/w/${advancedJson.daily[i].weather[0].icon}.png`,
          low: advancedJson.daily[i].temp.min,
          high: advancedJson.daily[i].temp.max,
        });
      }

      let sunrise = new Date(basicJson.sys.sunrise * 1000);
      let sunset = new Date(basicJson.sys.sunset * 1000);
      sunArr.push({
        sunriseHours: sunrise.getHours(),
        sunriseMinutes:
          (sunrise.getMinutes() < 10 ? '0' : '') + sunrise.getMinutes(),
        sunsetHours: sunset.getHours(),
        sunsetMinutes:
          (sunset.getMinutes() < 10 ? '0' : '') + sunset.getMinutes(),
      });

      setSevenDay(sevenDayArr);
      setSun(sunArr);
      setHourlyTemps(hourlyArr);
      setCurrentJson(basicJson);
      setGeo(geoCodeJson);
      setIcon(
        `https://openweathermap.org/img/wn/${basicJson.weather[0].icon}@2x.png`
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <Nav
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onClick={handleSubmit}
      />
      <div className="interface">
        <Routes>
          <Route
            path="/react-weather-app/"
            element={
              <Home
                date={date.toLocaleDateString()}
                city={loading ? null : currentJson.name}
                src={loading ? null : icon}
                temp={loading ? null : Math.floor(currentJson.main.temp)}
                state={loading ? null : geo[0].state}
                boolSwitch={loading}
                desc={loading ? null : currentJson.weather[0].description}
                hourly={
                  loading
                    ? null
                    : hourlyTemps.map((item) => {
                        return (
                          <div key={uniqid()}>
                            <div className="hourly-date">{`${
                              item.time.getMonth() + 1
                            }/${item.time.getDate()}`}</div>
                            <div className="hourly-time">{`${item.time.getHours()}:00`}</div>
                            <img src={item.icon} className="hourly-icon" />
                            <div className="hourly-temp">{item.temp}°</div>
                          </div>
                        );
                      })
                }
                sun={
                  loading
                    ? null
                    : sun.map((item) => {
                        return (
                          <div
                            key={uniqid()}
                          >{`Sunrise: ${item.sunriseHours}:${item.sunriseMinutes} - Sunset: ${item.sunsetHours}:${item.sunsetMinutes}`}</div>
                        );
                      })
                }
              />
            }
          />
          <Route
            path="/seven-day"
            element={
              <SevenDay boolSwitch={loading}>
                {sevenDay.map((day) => {
                  return (
                    <div key={uniqid()}>
                      <DailyCard
                        low={`${Math.floor(day.low)}°`}
                        high={`${Math.floor(day.high)}°`}
                        dailyDate={`${
                          day.date.getMonth() + 1
                        }/${day.date.getDate()}`}
                        dailyIcon={day.icon}
                      />
                    </div>
                  );
                })}
              </SevenDay>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
