import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const navStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <nav>
      <Link style={navStyle} to={''}>
        <h3 className="weather-for">
          <form onSubmit={props.handleSubmit}>
            <label htmlFor="zipcode">
              Weather for
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
            </label>
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
