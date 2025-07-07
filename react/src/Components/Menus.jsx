import React, { useState } from 'react';
import img1 from '../assets/imges/galery/cheif/שף1.png';
import img2 from '../assets/imges/galery/cheif/שף2.jpg';
import img3 from '../assets/imges/galery/cheif/שף3.png';
import img4 from '../assets/imges/galery/cheif/שף4.png';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const chefs = [
  {
    name: "Chef Doron Morel",
    img: img1,
    about: `Chef Doron Morel is an expert in luxury events, with over 20 years of experience in gourmet kitchens in Israel and abroad.
He has worked in Michelin-starred restaurants in Europe and is renowned for his creative approach to Mediterranean cuisine. Doron believes in using only the freshest ingredients and is passionate about providing a unique culinary experience for every guest. His signature dishes combine tradition with innovation, making every event unforgettable.`,
  },
  {
    name: "Chef Amir Cohen",
    img: img3,
    about: `Chef Amir Cohen leads the desserts and molecular gastronomy at our hall.
With a background in French patisserie and modernist cuisine, Amir brings a scientific touch to the kitchen. He loves experimenting with textures and flavors, offering guests a multisensory dining experience. Amir’s passion is to turn every dessert into a work of art.`,
  },
  {
    name: "Chef Erez Levi",
    img: img2,
    about: `Chef Erez Levi specializes in fusion cuisine, combining innovative flavors with Israeli tradition.
He has led culinary teams in top Tel Aviv restaurants and is known for his artistic plating and attention to detail. Erez draws inspiration from global trends and local markets, creating menus that surprise and delight. His desserts are especially famous for their beauty and taste.`,
  },
  {
    name: "Chef Yaakov Ben-David",
    img: img4,
    about: `Chef Yaakov Ben-David brings Mediterranean aromas and healthy cuisine to every event.
He is a pioneer in plant-based and gluten-free cooking, ensuring that every guest can enjoy delicious food regardless of dietary needs. Yaakov’s colorful salads and creative appetizers are always a highlight, and his warm personality makes him a favorite among clients.`,
  },
  {
    name: "Chef New Example",
    img: img1,
    about: `Chef New Example is a master of international cuisine.
He brings flavors from around the world and combines them with local ingredients for a unique experience. His creativity and attention to detail make every dish special.`,
  },
];

const ChefCard = styled(Paper)(({ theme }) => ({

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 220,
  minHeight: 320,
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: 18,
  background: 'rgba(255,255,255,0.95)',
  boxShadow: '0 4px 24px 0 rgba(205,170,125,0.10)',
  position: 'relative',
}));

const CircularImage = styled('img')(({ theme }) => ({
    
  width: 90,
  height: 90,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #CDAA7D',
  marginBottom: theme.spacing(1.5),
}));

const RowBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(30), // מרחיק מה-NAV
  marginBottom: theme.spacing(4),
}));

const Menus = () => {
  const [openIndexes, setOpenIndexes] = useState(Array(chefs.length).fill(false));

  const handleToggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', mt: 6, mb: 6 }}>
      <RowBox>
        {chefs.map((chef, idx) => {
          // המשפט הראשון בלבד
          const firstSentence = chef.about.split('\n')[0].split('. ')[0] + '.';
          const rest = chef.about.replace(firstSentence, '').trim();

          return (
            <ChefCard key={idx} elevation={3}>
              <CircularImage src={chef.img} alt={chef.name} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#CDAA7D',
                  letterSpacing: 1,
                  mb: 1,
                  textAlign: 'center',
                }}
              >
                {chef.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#222',
                  textAlign: 'center',
                  minHeight: 48,
                }}
              >
                {firstSentence}
              </Typography>
              <IconButton
                onClick={() => handleToggle(idx)}
                sx={{
                  color: '#CDAA7D',
                  mt: 1,
                  transform: openIndexes[idx] ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  alignSelf: 'center',
                }}
                aria-label="expand"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={openIndexes[idx]} timeout="auto" unmountOnExit>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#444',
                    mt: 1,
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {rest}
                </Typography>
              </Collapse>
            </ChefCard>
          );
        })}
      </RowBox>

      <Typography variant="h4" align="center" sx={{ mt: 6, mb: 2 }}>
        Welcome to the Menus
      </Typography>
      <Typography align="center" sx={{ mb: 4 }}>
        Here you can see our beautiful hall
      </Typography>
      {/* כאן אפשר להוסיף גלריית תמונות של האולם */}
    </Box>
  );
};

export default Menus;