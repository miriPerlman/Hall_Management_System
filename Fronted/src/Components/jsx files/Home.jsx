// react/src/Components/Home.jsx
import React from 'react';
import '../css files/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const navigate=useNavigate();
  const handleNavigateToOrder = () => {
    navigate('/LogIn');
};

const handleNavigateToGelery = () => {
    navigate('/Galery');
};
const handleNavigateToMenus = () => {
    navigate('/Menus');
};
const handleNavigateToFidback = () => {
    navigate('/Feedback');
};

  const customFontStyle = {
    fontFamily: 'Sanchez Condensed',
  };
  return (
    <div className="welcome-container">
      <h1>Welcome to your hall!!</h1>
      <p>MAZAL TOV!!</p>
      <div className="button-row">
        <button onClick={handleNavigateToGelery}>Gellerya </button>
        <button onClick={handleNavigateToMenus}>Menus </button>
        <button onClick={handleNavigateToFidback}>Fidback </button>
        <button onClick={handleNavigateToOrder}>insert into--! </button>
      </div>
    </div>
  );
};

export default Home;