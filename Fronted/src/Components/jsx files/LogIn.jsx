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
import { getByIdAsyncAction } from '../../Redux/thunk';
import '../css files/LOgin.css'; // New import

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
      <Box className="login-main-container"> {/* Replaced sx prop */}
        <Box className="login-form-box"> {/* Replaced sx prop */}
          <Avatar className="login-avatar"> {/* Replaced sx prop */}
            <LockOutlinedIcon className="login-lock-icon" /> {/* Replaced sx prop */}
          </Avatar>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            className="login-title" // Replaced sx prop
          >
            Log In
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
            gutterBottom
            className="login-subtitle" // Replaced sx prop
          >
            Welcome! Please enter your password to continue.
          </Typography>
          {message && (
            <Typography
              variant="subtitle2"
              color="secondary"
              className="login-message" // Replaced sx prop
            >
              {message}
            </Typography>
          )}
          <Box
            component="form"
            className="login-form" // Replaced sx prop
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
                      className="login-visibility-toggle" // Replaced sx prop
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                className: 'login-password-input-props', // Replaced sx prop
              }}
              InputLabelProps={{
                className: 'login-password-label-props' // Replaced sx prop
              }}
              className="login-password-textfield" // Replaced sx prop
            />
            <Stack direction="row" spacing={2} className="login-button-stack"> {/* Replaced sx prop */}
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                onClick={() => navigate('/order/guest')}
                color="secondary"
                className="login-guest-button" // Replaced sx prop
              >
                Guest
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                className="login-signin-button" // Replaced sx prop
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