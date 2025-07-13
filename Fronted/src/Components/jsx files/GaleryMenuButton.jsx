import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css files/GaleryMenuButton.css';

const GaleryMenuButton = () => (
  <NavLink
    to="/Galery"
    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
  >
    GALERY
  </NavLink>
);

export default GaleryMenuButton;