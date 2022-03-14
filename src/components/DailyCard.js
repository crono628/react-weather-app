import React from 'react';

const DailyCard = (props) => {
  const dailyDiv = (
    <div className="daily-forecast">
      <div className="daily-date">{props.date}</div>
      <div className="daily-icon">{props.icon}</div>
      <div className="daily-low">{props.low}</div>
      <div className="daily-high">{props.high}</div>
    </div>
  );
  return <div>{props.boolSwitch ? 'Gathering info' : dailyDiv}</div>;
};

export default DailyCard;
