import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import '../css files/GaleryMenuButton.css'; // New import

const menuItems = [
  { type: 'wedding', label: 'Wedding', icon: <PhotoLibraryIcon fontSize="small" /> },
  { type: 'bar-mitzvah', label: 'Bar Mitsva', icon: <PhotoLibraryIcon fontSize="small" /> },
  { type: 'brit', label: 'Brith', icon: <PhotoLibraryIcon fontSize="small" /> },
  { type: 'other', label: 'Other', icon: <PhotoLibraryIcon fontSize="small" /> },
];

const GaleryMenuButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => setOpen((prev) => !prev);

  const handleGalleryOption = (type) => {
    navigate(`/Galery?event=${type}`);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown')) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="nav-dropdown">
      <NavLink
        to="/Galery"
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        onClick={handleMenuClick}
      >
        GALERY
        <span className="nav-link-arrow">▼</span> {/* Replaced inline style */}
      </NavLink>
      {open && (
        <div className="nav-dropdown-content"> {/* Replaced inline style */}
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleGalleryOption(item.type)}
              className="nav-dropdown-item-button" // Replaced inline style
              onMouseOver={e => {
                e.currentTarget.classList.add('hover');
              }}
              onMouseOut={e => {
                e.currentTarget.classList.remove('hover');
              }}
            >
              <span className="nav-dropdown-item-icon"> {/* Replaced inline style */}
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleryMenuButton;