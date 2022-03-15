import React from 'react';

const DailyCard = (props) => {
  return (
    <div className="daily-forecast-card">
      <div className="daily-date">{props.dailyDate}</div>
      <img src={props.dailyIcon} className="daily-icon" />
      <div className="daily-low">{props.low}</div>
      <div className="daily-high">{props.high}</div>
    </div>
  );
};

export default DailyCard;
