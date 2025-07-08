import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Modal, Fade, IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
  },
});

const ImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  flexBasis: 'calc(33.33% - 16px)',
  maxWidth: 'calc(33.33% - 16px)',
  [theme.breakpoints.down('sm')]: {
    flexBasis: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
  },
  [theme.breakpoints.down('xs')]: {
    flexBasis: '100%',
    maxWidth: '100%',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
});

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const EnlargedImageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
}));

const EnlargedImage = styled('img')({
  maxWidth: '90vw',
  maxHeight: '90vh',
  borderRadius: 8,
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  position: 'absolute',
  zIndex: 10,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const LeftNavigationButton = styled(NavigationButton)({
  left: theme.spacing(2),
});

const RightNavigationButton = styled(NavigationButton)({
  right: theme.spacing(2),
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

const Galery = () => {
  const query = useQuery();
  const event = (query.get('event') || 'wedding').toLowerCase();
  const images = imagesByEvent[event] || imagesByEvent['wedding'];

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
        return 'Wedding';
      case 'bar-mitzvah':
        return 'Bar Mitzvah';
      case 'brit':
        return 'Brit';
      default:
        return 'Other';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, marginTop: '80px' }}> {/* Added margin-top for fixed nav */}
        <Typography variant="h4" gutterBottom>
          Gallery - {getEventTitle(event)}
        </Typography>
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(2), marginTop: theme.spacing(2) }}>
          {images.map((img, index) => (
            <ImageContainer key={index} onClick={() => handleOpen(img, index)}>
              <Image src={img} alt={`Gallery Item ${index + 1}`} />
            </ImageContainer>
          ))}
        </Box>

        <StyledModal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <EnlargedImageContainer onClick={handleClose}>
              <LeftNavigationButton onClick={handlePrevImage}>
                <ArrowBackIosNewRoundedIcon fontSize="large" />
              </LeftNavigationButton>
              {selectedImage && <EnlargedImage src={selectedImage} alt="Enlarged" />}
              <RightNavigationButton onClick={handleNextImage}>
                <ArrowForwardIosRoundedIcon fontSize="large" />
              </RightNavigationButton>
            </EnlargedImageContainer>
          </Fade>
        </StyledModal>
      </Box>
    </ThemeProvider>
  );
};

export default Galery;