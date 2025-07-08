import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LoginIcon from '@mui/icons-material/Login';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import '../css files/Manager.css'; // New import

const gold = "#CDAA7D";
const white = "#fff";

const iconProps = { sx: { color: gold, fontSize: 32 } };

const Manager = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Box className="manager-main-box"> {/* Added className */}
      <Typography
        variant="h3"
        className="manager-greeting" // Added className
      >
        Hello {name} <span className="manager-emoji">👋</span> {/* Added className */}
      </Typography>
      <Typography
        variant="subtitle1"
        className="manager-welcome-message" // Added className
      >
        Welcome to the management area
      </Typography>
      <Stack spacing={2.5}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon {...iconProps} />}
          onClick={() => navigate('/CreateNewWorker')}
          className="manager-button" // Added className
        >
          Add Worker
        </Button>
        <Button
          variant="outlined"
          startIcon={<ListAltIcon {...iconProps} />}
          onClick={() => navigate('/AllWorkers')}
          className="manager-button" // Added className
        >
          Workers Details
        </Button>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ReceiptLongIcon sx={{ color: gold, fontSize: 32 }} />}
          onClick={() => navigate('/orders-management')}
          className="manager-button" // Added className
          fullWidth
        >
          Orders Management
        </Button>
        <Button
          variant="outlined"
          startIcon={<LoginIcon {...iconProps} />}
          onClick={() => navigate(`/Worker/${name}`)}
          className="manager-button" // Added className
        >
          Login as Worker
        </Button>
        <Button
          variant="outlined"
          startIcon={<FeedbackIcon {...iconProps} />}
          onClick={() => navigate('/Feedback')}
          className="manager-button" // Added className
        >
          Feedback Management
        </Button>
      </Stack>
    </Box>
    <Typography
      variant="subtitle2"
      className="manager-good-luck" // Added className
    >
      Good Luck!
    </Typography>
    </>
  );
};

export default Manager;