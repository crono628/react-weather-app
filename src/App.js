import React, { useState, useEffect } from 'react';
import Current from './components/Current';
import Nav from './components/Nav';
import SevenDay from './components/SevenDay';
import './style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import zips from './components/Zips';
import uniqid from 'uniqid';

const App = () => {
  const [currentForecast, setCurrentForecast] = useState([]);
  const [sevenDay, setSevenDay] = useState([]);
  const [zip, setZip] = useState(
    Math.floor(parseInt(zips[Math.floor(Math.random() * zips.length)]))
  );
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  let homeText = document.querySelector('.home');
  let navigate = useNavigate();

  useEffect(() => {
    getWeather();
    let timer = setInterval(() => tick(), 1000);
    clearInterval(timer);
  }, []);

  const tick = () => setDate(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    setZip(document.getElementById('zipcode').value);
    getWeather();
    navigate('/current');
  };

  const handleChange = (e) => {
    document.querySelector('.home').textContent = '';
    setZip(e.target.value);
    setIcon(null);
  };

  const apiValueBasic = () =>
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=53dcc962829731a4fa033950e8997254`;

  const apiValueComprehensive = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;

  const geocode = (lat, lon) =>
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=53dcc962829731a4fa033950e8997254`;

  async function getWeather() {
    setLoading(true);
    try {
      const basicData = await fetch(apiValueBasic(), { mode: 'cors' });
      const basicJson = await basicData.json();
      console.log(basicJson);
      const advancedData = await fetch(
        apiValueComprehensive(basicJson.coord.lat, basicJson.coord.lon)
      );
      const advancedJson = await advancedData.json();
      setCurrentForecast(basicJson);
      setSevenDay(basicJson);
      setIcon(
        `https://openweathermap.org/img/w/${basicJson.weather[0].icon}.png`
      );

      console.log(advancedJson);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <Nav handleChange={handleChange} handleSubmit={handleSubmit} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              time={date.toLocaleTimeString()}
              date={date.toLocaleDateString()}
              city={currentForecast.name}
              src={loading ? null : icon}
              temp={loading ? null : Math.floor(currentForecast.main.temp)}
            />
          }
        />
        <Route path="/current" element={<Current />} />
        <Route path="/seven-day" element={<SevenDay />} />
      </Routes>
    </div>
  );
};

const Home = (props) => {
  return (
    <div>
      <h4>{props.date}</h4>
      <h6>{props.time}</h6>
      <div className="welcome">
        <h2 className="home">
          Currently in {props.city} it is {props.temp}°
        </h2>
        <img src={props.src} />
      </div>
    </div>
  );
};

export default App;
