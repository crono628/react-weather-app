import React from 'react';
import Home from './Home';

const Current = (props) => {
  return (
    <div>
      <Home
        date={props.date}
        city={props.city}
        src={props.src}
        temp={props.temp}
        state={props.state}
        boolSwitch={props.boolSwitch}
        desc={props.desc}
      />
      <div className="hourly">{props.hourly}</div>
    </div>
  );
};

export default Current;
