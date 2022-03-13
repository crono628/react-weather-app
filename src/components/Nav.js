import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const navStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <nav>
      <Link style={navStyle} to={'/react-weather-app/'}>
        <h3 className="weather-for">
          <form onSubmit={props.handleSubmit}>
            <label htmlFor="zipcode">Weather for</label>
            <div>
              <input
                minLength="5"
                maxLength="5"
                type="text"
                pattern="[0-9]*"
                onChange={props.handleChange}
                id="zipcode"
                className="zipcode"
                placeholder="zipcode"
              />
              <input
                onClick={props.onClick}
                className="submit-btn"
                type="submit"
              />
            </div>
          </form>
        </h3>
      </Link>

      <div className="nav-links">
        <Link style={navStyle} to={'/current'}>
          <div className="current">Current Conditions</div>
        </Link>

        <Link style={navStyle} to={'/seven-day'}>
          <div>7-day Forecast</div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
