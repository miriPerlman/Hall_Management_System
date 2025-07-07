import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getByIdAsyncAction } from '../Redux/thunk';

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

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePassword = (e) => setPassword(e.target.value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const resultAction = await dispatch(getByIdAsyncAction(password));
      if (getByIdAsyncAction.fulfilled.match(resultAction)) {
        if(resultAction.payload.type=='customer'){
          setMessage('Welcome again!!');
          const firstName = resultAction.payload.obj.firstName || 'Guest';
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate(`/PersonalArea/${firstName}`);
        }
        else {
         setMessage('Welcome worker!')
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const firstName=resultAction.payload.obj.name;
            const managerFirstName=resultAction.payload.obj.name;
          if(resultAction.payload.workerType==='Manager'){
            navigate(`/Manager/${managerFirstName}`);
          }
         else navigate(`/Worker/${password}`);
        } 
      } else {
        setMessage('Please sign up to continue.');
        navigate(`/SignUp/${password}`);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={THEME}>
      <Box
  sx={{
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(to bottom, #f0f0f0, #d9d9d9)', // צבע גרדיאנטי
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
            maxWidth: 400,
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
            <LockOutlinedIcon sx={{ fontSize: 32, color: '#fff' }} />
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
            Log In
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
            gutterBottom
            sx={{ mb: 3, fontWeight: 500, opacity: 0.85, textAlign: 'center' }}
          >
            Welcome! Please enter your password to continue.
          </Typography>
          {message && (
            <Typography
              variant="subtitle2"
              color="secondary"
              sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}
            >
              {message}
            </Typography>
          )}
          <Box
            component="form"
            sx={{ width: '100%' }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={handlePassword}
              variant="outlined"
              autoFocus
              placeholder="Enter your password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: '#CDAA7D', fontWeight: 600 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 0,
                  background: '#fff',
                  color: '#213547',
                  fontWeight: 600,
                  letterSpacing: 1,
                  caretColor: '#CDAA7D',
                  '& input::placeholder': {
                    color: '#CDAA7D',
                    opacity: 0.5,
                    fontWeight: 100,
                  },
                },
              }}
              InputLabelProps={{
                style: { color: '#CDAA7D', fontWeight: 700 }
              }}
              sx={{
                input: { color: '#213547', caretColor: '#CDAA7D', fontWeight: 600 },
                label: { color: '#CDAA7D' },
                mb: 3,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#CDAA7D',
                  borderRadius: 0,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#213547',
                },
              }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                onClick={() => navigate('/order/guest')}
                color="secondary"
                sx={{
                  borderColor: '#CDAA7D',
                  color: '#CDAA7D',
                  background: 'transparent',
                  fontWeight: 700,
                  fontFamily: 'Varela Round, Alef, Arial, sans-serif',
                  fontSize: '1.1em',
                  borderRadius: 0,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 2px 8px #0006',
                  '&:hover': {
                    background: '#CDAA7D11',
                    color: '#213547',
                    borderColor: '#CDAA7D',
                  },
                }}
              >
                Guest
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  minWidth: 120,
                  fontWeight: 700,
                  fontFamily: 'Varela Round, Alef, Arial, sans-serif',
                  fontSize: '1.1em',
                  borderRadius: 0,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 2px 8px #0006',
                  '&:hover': {
                    background: '#b8956a',
                  },
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LogIn;

