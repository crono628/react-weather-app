import React, { useEffect } from 'react';

const Shop = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const apiValueBasic = () =>
    `https://api.openweathermap.org/data/2.5/weather?zip=12524,us&units=imperial&APPID=53dcc962829731a4fa033950e8997254`;

  const apiValueComprehensive = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=53dcc962829731a4fa033950e8997254`;

  async function fetchItems() {
    try {
      const data = await fetch(apiValueBasic(), { mode: 'cors' });
      const items = await data.json();
      console.log(items);
    } catch (err) {
      console.log(err);
    }
  }

  return <div>Shop</div>;
};

export default Shop;
