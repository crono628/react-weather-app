import React from 'react';
import About from './components/About';
import Nav from './components/Nav';
import Shop from './components/Shop';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const Home = () => {
  return <h1>Home</h1>;
};

export default App;
