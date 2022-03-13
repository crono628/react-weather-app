import React from 'react';

const Home = (props) => {
  const welcomeDiv = (
    <div className="welcome">
      <div>
        <h2 className="home">Currently in</h2>
        <h2>
          {props.city}, {props.state} it is {props.temp}°
        </h2>
        <img src={props.src} />
      </div>
    </div>
  );

  return (
    <div>
      <h4>{props.date}</h4>
      <h6>{props.time}</h6>
      {props.boolSwitch ? 'Loading' : welcomeDiv}
    </div>
  );
};

export default Home;
