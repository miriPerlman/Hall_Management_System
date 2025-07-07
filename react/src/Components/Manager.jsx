import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Stack, colors } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LoginIcon from '@mui/icons-material/Login';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const gold = "#CDAA7D";
const white = "#fff";

const iconProps = { sx: { color: gold, fontSize: 32 } };

const Manager = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Box
      sx={{
        mt: 6,
        mx: 'auto',
        maxWidth: 600,
        p: 6,
        borderRadius: 3,
        background: white,
        boxShadow: '0 4px 24px 0 rgba(205,170,125,0.10)',
        textAlign: 'center',
        fontFamily: 'Varela Round, Alef, Arial, sans-serif',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
          letterSpacing: 1,
          color: gold,
          fontSize: '2.1rem',
          fontFamily: 'Varela Round, Alef, Arial, sans-serif',
          textShadow: '0 2px 8px #CDAA7D22',
        }}
      >
        Hello {name} <span style={{fontSize: '1.7rem'}}>👋</span>
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          fontWeight: 400,
          color: gold,
          fontSize: '1.1rem',
          fontFamily: 'Varela Round, Alef, Arial, sans-serif',
          letterSpacing: 1,
          textShadow: '0 1px 4px #CDAA7D11',
        }}
      >
        Welcome to the management area
      </Typography>
      <Stack spacing={2.5}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon {...iconProps} />}
          onClick={() => navigate('/CreateNewWorker')}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: gold,
            color: gold,
            background: white,
            fontSize: '1.05rem',
            py: 1.2,
            px: 1,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            letterSpacing: 1,
            boxShadow: '0 1px 4px #CDAA7D11',
            transition: 'all 0.2s',
            textTransform: 'none',
            '&:hover': {
              background: gold,
              color: white,
              borderColor: gold,
              boxShadow: '0 2px 8px #CDAA7D33',
            },
          }}
        >
          Add Worker
        </Button>
        <Button
          variant="outlined"
          startIcon={<ListAltIcon {...iconProps} />}
          onClick={() => navigate('/AllWorkers')}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: gold,
            color: gold,
            background: white,
            fontSize: '1.05rem',
            py: 1.2,
            px: 1,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            letterSpacing: 1,
            boxShadow: '0 1px 4px #CDAA7D11',
            transition: 'all 0.2s',
            textTransform: 'none',
            '&:hover': {
              background: gold,
              color: white,
              borderColor: gold,
              boxShadow: '0 2px 8px #CDAA7D33',
            },
          }}
        >
          Workers Details
        </Button>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ReceiptLongIcon sx={{ color: gold, fontSize: 32 }} />}
          onClick={() => navigate('/orders-management')}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: gold,
            color: gold,
            background: white,
            fontSize: '1.05rem',
            py: 1.2,
            px: 1,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            letterSpacing: 1,
            boxShadow: '0 1px 4px #CDAA7D11',
            transition: 'all 0.2s',
            textTransform: 'none',
            '&:hover': {
              background: gold,
              color: white,
              borderColor: gold,
              boxShadow: '0 2px 8px #CDAA7D33',
            },
          }}
          fullWidth
        >
          Orders Management
        </Button>
        <Button
          variant="outlined"
          startIcon={<LoginIcon {...iconProps} />}
          onClick={() => navigate(`/Worker/${name}`)}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: gold,
            color: gold,
            background: white,
            fontSize: '1.05rem',
            py: 1.2,
            px: 1,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            letterSpacing: 1,
            boxShadow: '0 1px 4px #CDAA7D11',
            transition: 'all 0.2s',
            textTransform: 'none',
            '&:hover': {
              background: gold,
              color: white,
              borderColor: gold,
              boxShadow: '0 2px 8px #CDAA7D33',
            },
          }}
        >
          Login as Worker
        </Button>
        <Button
          variant="outlined"
          startIcon={<FeedbackIcon {...iconProps} />}
          onClick={() => navigate('/Feedback')}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: gold,
            color: gold,
            background: white,
            fontSize: '1.05rem',
            py: 1.2,
            px: 1,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            letterSpacing: 1,
            boxShadow: '0 1px 4px #CDAA7D11',
            transition: 'all 0.2s',
            textTransform: 'none',
            '&:hover': {
              background: gold,
              color: white,
              borderColor: gold,
              boxShadow: '0 2px 8px #CDAA7D33',
            },
          }}
        >
          Feedback Management
        </Button>
      </Stack>
    </Box>
    <Typography
      variant="subtitle2"
      sx={{
        mt: 3,
        color: gold,
        fontWeight: 400,
        fontSize: '3.1rem',
        letterSpacing: 1,
        fontFamily: 'Varela Round, Alef, Arial, sans-serif',
        textShadow: '0 1px 4px #CDAA7D22',
      }}
    >
      Good Luck!
    </Typography>
    </>
  );
};

export default Manager;