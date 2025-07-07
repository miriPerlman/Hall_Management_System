import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextInvitations, getWorkerById } from "../Redux/thunk";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  Paper
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

const WorkerComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {Id} = useParams();
  const worker = (state => state.workers.worker);
  const nextInvitations = useSelector(state => state.workers.invitations);
  const [selectedDish, setSelectedDish] = useState(null);

  // מנגנון נעילה
  const isLoadingWorker = useRef(false);

  useEffect(() => {
    dispatch(getNextInvitations());
  }, [dispatch]);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!Id || isLoadingWorker.current) return;
      isLoadingWorker.current = true;
      try {
        console.log("Fetching worker with ID:", Id);
        await dispatch(getWorkerById(Id));
      } finally {
        isLoadingWorker.current = false;
      }
    };
    fetchWorker();
  }, [dispatch, Id]);

  const handleOpenPopup = (invitation) => {
    setSelectedDish(invitation);
  };

  const handleClosePopup = () => {
    setSelectedDish(null);
  };

  return (
    <ThemeProvider theme={THEME}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(to bottom, #f0f0f0, #d9d9d9)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            px: 3,
            py: 5,
            borderRadius: 0,
            background: '#fff',
            border: '1.5px solid #CDAA7D',
            boxShadow: '0 4px 24px 0 rgba(205,170,125,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#CDAA7D',
              width: 60,
              height: 60,
              mb: 2,
              boxShadow: '0 2px 8px #CDAA7D33',
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Avatar>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              mb: 2,
              textShadow: '0 2px 8px #0001',
            }}
          >
            Worker Area
          </Typography>
          {worker && (
            <Box sx={{ mb: 4, width: '100%' }}>
              <Typography
                variant="h6"
                color="secondary"
                sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}
              >
                Wellcome {worker.name}!!
              </Typography>
              <Typography sx={{ mb: 0.5 }}>טלפון: {worker.phone}</Typography>
              <Typography sx={{ mb: 0.5 }}>סוג העבודה: {worker.workerType}</Typography>
              <Typography sx={{ mb: 0.5 }}>מייל: {worker.email}</Typography>
              <Typography sx={{ mb: 0.5 }}>משכורת: {worker.salary}</Typography>
              <Typography sx={{ mb: 0.5 }}>שעות שבועיות: {worker.hoursAtWeek}</Typography>
              <Typography sx={{ mb: 0.5 }}>שנות ותק: {worker.seniority}</Typography>
            </Box>
          )}

          <Typography
            variant="subtitle1"
            color="secondary"
            gutterBottom
            sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}
          >
            Invitations for next week:
          </Typography>

          <Stack spacing={2} sx={{ width: '100%' }}>
            {nextInvitations.map((invitation, index) => (
              <Paper
                key={invitation.id}
                elevation={2}
                sx={{
                  border: '1px solid gold',
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Invitation {index + 1}
                </Typography>
                <Typography sx={{ mb: 0.5 }}>Date: {invitation.date}</Typography>
                <Typography sx={{ mb: 0.5 }}>Count of Dishes: {invitation.countOfDishes}</Typography>
                <Typography sx={{ mb: 0.5 }}>Number of Waiters: {invitation.numberOfWaiters}</Typography>
                <Typography sx={{ mb: 0.5 }}>
                  Is Upgraded Dish: {invitation.isUpgradedDish ? "Yes" : "No"}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mt: 1, borderRadius: 0 }}
                  onClick={() => handleOpenPopup(invitation)}
                >
                  View Dish Details
                </Button>
              </Paper>
            ))}
          </Stack>

          
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 4,
              borderRadius: 0,
              fontWeight: 700,
              fontSize: '1.1em',
              px: 4,
              py: 1.5,
              boxShadow: '0 2px 8px #0006',
            }}

          onClick={() => navigate(`/Order/${worker.obj.name}`)}
          >
            למעבר להזמנת אירוע במחיר מוזל
          </Button>

          {selectedDish && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3000,
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  minWidth: 300,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Dish Details
                </Typography>
                <Typography sx={{ mb: 1 }}>Name: {selectedDish.dishName}</Typography>
                <Typography sx={{ mb: 2 }}>Description: {selectedDish.description}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClosePopup}
                  sx={{ borderRadius: 0 }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WorkerComponent;
