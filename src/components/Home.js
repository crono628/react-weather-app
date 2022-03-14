import React from 'react';

const Home = (props) => {
  const welcomeDiv = (
    <div className="welcome">
      <div className="sun">{props.sun}</div>
      <div>
        <h2 className="home">Currently in</h2>
        <h2>
          {props.city}, {props.state} it is {props.temp}°
        </h2>
        <h2>and {props.desc}</h2>
        <img className="home-icon" src={props.src} />
      </div>
      <div className="hourly">{props.hourly}</div>
      <div className="hourly-scroller">Scroll for 24-hour forecast</div>
    </div>
  );

  return (
    <div>
      <h4>{props.date}</h4>
      {props.boolSwitch ? 'Gathering info' : welcomeDiv}
    </div>
  );
};

export default Home;
