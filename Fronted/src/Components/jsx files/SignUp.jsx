import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewCustomerAsyncAction, getByIdAsyncAction } from "../../Redux/thunk";
import '../css files/LOgin.css';

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

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    const customerData = {
      id: parseInt(id),
      firstName,
      lastName,
      phoneNum: phoneNumber,
      email
    };
    try {
      const resultAction = await dispatch(createNewCustomerAsyncAction(customerData));
      if (createNewCustomerAsyncAction.fulfilled.match(resultAction)) {
        setMessage('Customer created successfully!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await dispatch(getByIdAsyncAction(id));
        navigate(`/PersonalArea/${firstName}`);
      } else {
        setMessage('Failed to create customer: ' + resultAction.error.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={THEME}>
      <Box className="login-main-container">
        <Box className="login-form-box">
          <Avatar className="login-avatar">
            <PersonAddAlt1Icon className="login-lock-icon" />
          </Avatar>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            className="login-title"
          >
            Sign Up
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
            gutterBottom
            className="login-subtitle"
          >
            Please fill in your details to sign up.
          </Typography>
          {message && (
            <Typography
              variant="subtitle2"
              color="secondary"
              className="login-message"
            >
              {message}
            </Typography>
          )}
          <Box
            component="form"
            className="login-form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="ID"
              value={id}
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true,
                className: 'login-password-input-props',
              }}
              InputLabelProps={{
                className: 'login-password-label-props'
              }}
              className="login-password-textfield"
            />
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              className="login-password-textfield"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              className="login-password-textfield"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              className="login-password-textfield"
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              className="login-password-textfield"
            />
            <Stack direction="row" spacing={2} className="login-button-stack" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SendIcon />}
                className="login-signin-button"
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  fontSize: '1.1em',
                  boxShadow: '0 2px 8px #CDAA7D44',
                  letterSpacing: 1,
                }}
              >
                Continue
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;