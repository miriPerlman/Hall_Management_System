import React, { useState } from 'react';
import { Button, Modal, Fade, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../assets/imges/galery/8.png';
import img2 from '../../assets/imges/galery/9.jpg';
import img3 from '../../assets/imges/galery/10.jpg';
import img4 from '../../assets/imges/galery/11.jpg';
import img5 from '../../assets/imges/galery/12.jpg';
import img6 from '../../assets/imges/galery/13.jpg';
import img7 from '../../assets/imges/galery/14.png';
import img8 from '../../assets/imges/galery/15.png';
import img9 from '../../assets/imges/galery/16.webp';
import img10 from '../../assets/imges/galery/18.png';
import img11 from '../../assets/imges/galery/19.png';
import img12 from '../../assets/imges/galery/20.png';
import img13 from '../../assets/imges/galery/21.png';
import img14 from '../../assets/imges/galery/22.png';
import img15 from '../../assets/imges/galery/23.png';
import img16 from '../../assets/imges/galery/29.png';
import img17 from '../../assets/imges/galery/25.png';
import img18 from '../../assets/imges/galery/26.png';
import img20 from '../../assets/imges/galery/28.png';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import "../css files/Galery.css";

const THEME = createTheme({
  palette: {
    primary: {
      main: '#CDAA7D', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#213547',
    },
  },
  typography: {
    fontFamily: 'Varela Round, Alef, Arial, sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: 2,
    },
  },
});

const imagesByEvent = {
  wedding: [img1, img2, img3, img6, img7, img8, img10, img5, img17],
  'bar-mitzvah': [img4, img9, img20],
  brit: [img11, img12, img13, img14, img15],
  other: [img16, img18],
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const eventButtons = [
  { type: 'wedding', label: 'wedding' },
  { type: 'bar-mitzvah', label: 'bar-mitzvah' },
  { type: 'brit', label: 'brit' },
  { type: 'other', label: 'other' },
];

const Galery = () => {
  const query = useQuery();
  const event = (query.get('event') || 'wedding').toLowerCase();
  const images = imagesByEvent[event] || imagesByEvent['wedding'];
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpen = (imageSrc, index) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setSelectedImageIndex(0);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const getEventTitle = (event) => {
    switch (event) {
      case 'wedding':
        return 'wedding';
      case 'bar-mitzvah':
        return 'bar-mitzvah';
      case 'brit':
        return 'brit';
      default:
        return 'other';
    }
  };

  return (
    <ThemeProvider theme={THEME}>
      <div className="gallery-event-buttons-fixed">
        {eventButtons.map(btn => (
          <Button
            key={btn.type}
            variant={event === btn.type ? "contained" : "outlined"}
            color="primary"
            sx={{
              mb: 1,
              fontWeight: 700,
              borderRadius: 3,
              minWidth: 120,
              letterSpacing: 1,
              fontSize: '1.1em',
              boxShadow: event === btn.type ? 2 : 0,
              borderWidth: 2
            }}
            onClick={() => navigate(`/Galery?event=${btn.type}`)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="gallery-main-container">
        <Typography variant="h4" gutterBottom className="gallery-title">
          {getEventTitle(event)}
        </Typography>
        <div className="gallery-images-container">
          {images.map((img, index) => (
            <div
              key={index}
              className="gallery-image-container"
              onClick={() => handleOpen(img, index)}
            >
              <img src={img} alt={`Gallery Item ${index + 1}`} className="gallery-image" />
            </div>
          ))}
        </div>
        <Modal
          className="gallery-modal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <div className="gallery-modal-content" onClick={handleClose}>
              <button className="gallery-modal-nav-btn left" onClick={handlePrevImage}>
                <ArrowBackIosNewRoundedIcon fontSize="large" />
              </button>
              {selectedImage && (
                <img src={selectedImage} alt="Enlarged" className="gallery-modal-img" />
              )}
              <button className="gallery-modal-nav-btn right" onClick={handleNextImage}>
                <ArrowForwardIosRoundedIcon fontSize="large" />
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default Galery;