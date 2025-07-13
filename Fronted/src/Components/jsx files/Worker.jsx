import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextInvitations, getWorkerById } from "../../Redux/thunk";
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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const gold = "#CDAA7D";
const black = "#222";
const grayBg = "#f7f7f9";

const THEME = createTheme({
  palette: {
    primary: {
      main: gold,
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
  const { Id } = useParams();
  const worker = useSelector(state => state.workers.worker);
  const allWorkers = useSelector(state => state.workers.workersList);
  const nextInvitations = useSelector(state => state.workers.invitations);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);


  const isLoadingWorker = useRef(false);


  const currentWorker = worker?.name
    ? worker
    : allWorkers.find(w => w.name === name || w.id === Id);

  const workerDetails = currentWorker
    ? {
        name: currentWorker.name,
        id: currentWorker.id,
        age: currentWorker.age,
        phone: currentWorker.phone,
        seniority: currentWorker.seniority,
        email: currentWorker.email,
        workerType: currentWorker.workerType,
        salary: currentWorker.salary,
        hoursAtWeek: currentWorker.hoursAtWeek,
      }
    : {
        name: name || "No worker found",
        id: "",
        age: "",
        phone: "",
        seniority: "",
        email: "",
        workerType: "לא מוגדר",
        salary: "",
        hoursAtWeek: "",
      };

  useEffect(() => {
    const fetchWorkerAndInvitations = async () => {
      if (!Id || isLoadingWorker.current) return;
      isLoadingWorker.current = true;
      try {
        await dispatch(getWorkerById(Id));
        await dispatch(getNextInvitations());
      } finally {
        isLoadingWorker.current = false;
      }
    };
    fetchWorkerAndInvitations();
  }, [dispatch, Id]);

  const handleOpenPopup = (invitation) => {
    setSelectedDish(invitation);
  };

  const handleClosePopup = () => {
    setSelectedDish(null);
  };

  // קומפוננטת יצירת אירוע (דמו)

  return (
    <ThemeProvider theme={THEME}>
      {/* סרגל צד עם פרטי העובד */}
      <Box
        sx={{
          marginTop:12.5,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 290,
          background: "#fff",
          borderLeft: `2px solid ${gold}`,
          boxShadow: '-2px 0 12px #CDAA7D22',
          zIndex: 2100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 4,
          pt: 8,
          gap: 2,
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: gold, width: 56, height: 56, mr: 1 }}>
            <AccountCircleIcon sx={{ color: "#fff", fontSize: 36 }} />
          </Avatar>
          <Typography sx={{ fontWeight: 700, fontSize: '1.3em', color: black }}>
            {workerDetails.name}
          </Typography>
        </Box>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Age:</b> {workerDetails.age}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Phone:</b> {workerDetails.phone}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Seniority:</b> {workerDetails.seniority}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Email:</b> {workerDetails.email}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Type:</b> {workerDetails.workerType}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Salary:</b> {workerDetails.salary}
        </Typography>
        <Typography sx={{ color: black, fontSize: '1.1em', mb: 1 }}>
          <b>Weekly Hours:</b> {workerDetails.hoursAtWeek}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<EventAvailableIcon sx={{ color: '#fff', fontSize: 32 }} />}
          onClick={() => navigate(`/Order/${workerDetails.name}`)}
          sx={{
            width: '100%',
            background: gold,
            color: black,
            fontWeight: 900,
            borderRadius: 3,
            fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            fontSize: '1.2em',
            boxShadow: '0 4px 16px #CDAA7D44',
            letterSpacing: 1,
            px: 2,
            py: 1.2,
            minWidth: 0,
            border: `2px solid ${gold}`,
            mt: 2,
            mb: 1,
            transition: 'all 0.2s',
            textShadow: '0 2px 8px #CDAA7D33',
            '&:hover': {
              background: black,
              color: gold,
              borderColor: black,
              boxShadow: '0 6px 18px #CDAA7D66',
            },
          }}
        >
          הזמנת אירוע
        </Button>
      </Box>

      {/* מרכז העמוד */}
      <Box
        sx={{
          marginRight: 290,
          width: 'calc(100% - 290px)',
          minHeight: '100vh',
          minWidth: 320,
          background: grayBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
          overflowY: 'auto',
        }}
      >
        {/* כותרת יפה עם אייקון */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 5,
          background: "#fff",
          px: 4,
          py: 2,
          borderRadius: 3,
          boxShadow: '0 2px 12px #CDAA7D22',
        }}>
          <WorkOutlineIcon sx={{ color: gold, fontSize: 40 }} />
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: '0 2px 8px #CDAA7D33',
              fontFamily: 'Varela Round, Alef, Arial, sans-serif',
            }}
          >
            Worker Area
          </Typography>
        </Box>

        {/* כותרת הזמנות השבוע */}
        <Typography
          variant="h5"
          color="secondary"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            mb: 4,
            textShadow: '0 2px 8px #0001',
          }}
        >
          Invitations for next week
        </Typography>

        {/* כרטיסי הזמנות */}
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 520 }}>
          {(nextInvitations && Array.isArray(nextInvitations) && nextInvitations.length > 0) ? (
            nextInvitations.map((invitation, index) => (
              <Paper
                key={invitation.id}
                elevation={3}
                sx={{
                  border: `1.5px solid ${gold}`,
                  borderRadius: 4,
                  p: 3,
                  backgroundColor: 'rgba(255,255,255,0.97)',
                  boxShadow: '0 2px 12px #CDAA7D22',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: '0 6px 24px #CDAA7D44',
                    borderColor: black,
                  }
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, color: black, fontWeight: 700 }}>
                  Invitation {index + 1}
                </Typography>
                <Typography sx={{ mb: 0.5, color: black }}>Date: {invitation.date}</Typography>
                <Typography sx={{ mb: 0.5, color: black }}>Count of Dishes: {invitation.countOfDishes}</Typography>
                <Typography sx={{ mb: 0.5, color: black }}>Number of Waiters: {invitation.numberOfWaiters}</Typography>
                <Typography sx={{ mb: 0.5, color: black }}>
                  Is Upgraded Dish: {invitation.isUpgradedDish ? "Yes" : "No"}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mt: 1, borderRadius: 2, alignSelf: 'flex-end', fontWeight: 700 }}
                  onClick={() => handleOpenPopup(invitation)}
                >
                  View Dish Details
                </Button>
              </Paper>
            ))
          ) : (
            <Typography color="error" sx={{ fontWeight: 700, textAlign: 'center', mt: 4 }}>
              לא נמצאו הזמנות לשבוע הקרוב
            </Typography>
          )}
        </Stack>

        {/* פופאפ פרטי מנה */}
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
                borderRadius: 3,
                boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                minWidth: 320,
                maxWidth: 400,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: gold, fontWeight: 700 }}>
                Dish Details
              </Typography>
              <Typography sx={{ mb: 1, color: black }}>Name: {selectedDish.dishName}</Typography>
              <Typography sx={{ mb: 2, color: black }}>Description: {selectedDish.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClosePopup}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* פופאפ יצירת אירוע */}
      {showCreateEvent && (
        <Box
          sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 4000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{
            background: '#fff',
            borderRadius: 3,
            p: 4,
            minWidth: 350,
            minHeight: 200,
            position: 'relative'
          }}>
            <Button
              onClick={() => setShowCreateEvent(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                minWidth: 0,
                color: gold,
                fontWeight: 700,
                fontSize: '1.2em'
              }}
            >X</Button>
            <CreateEvent />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default WorkerComponent;
