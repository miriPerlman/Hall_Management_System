import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

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

  // סגירה בלחיצה מחוץ לתפריט (אופציונלי)
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown')) setOpen(false);
    };
document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="nav-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
      <NavLink
        to="/Galery"
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontFamily: "'Rod', sans-serif",
          fontSize: 26,
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          padding: '8px 0',
          margin: '0 15px',
          borderBottom: '2px solid transparent',
          height: 40,
          transition: 'color 0.3s, border-bottom 0.3s',
        }}
        onClick={handleMenuClick}
      >
        GALERY
        <span
          className="nav-link-arrow"
          style={{
            fontSize: 22,
            marginRight: 4,
            marginTop: 2,
            color: '#CDAA7D', // תמיד זהב
            transition: 'color 0.3s'
          }}
        >▼</span>
      </NavLink>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fffbe8',
            borderRadius: '16px',
            boxShadow: '0 6px 24px 0 rgba(205,170,125,0.18)',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '180px',
            zIndex: 100,
            padding: '10px 0',
            border: '1px solid #f3e2c2'
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleGalleryOption(item.type)}
              style={{
                background: 'none',
                border: 'none',
                color: '#213547',
                fontWeight: 700,
                fontSize: '0.95em', // <--- כאן הקטנה (אפשר גם 15px או 14px)
                padding: '10px 22px 10px 14px',
                textAlign: 'right',
                cursor: 'pointer',
                borderRadius: 10,
                transition: 'background 0.2s, color 0.2s',
                margin: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#f7e7c1';
                e.currentTarget.style.color = '#b8956a';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#213547';
              }}
            >
              <span style={{ color: '#b8956a', display: 'flex', alignItems: 'center', fontSize: 18 }}>
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
