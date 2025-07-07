import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { Stack, FormControl, FormLabel, Input, FormHelperText, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { createNewCustomerAsyncAction, getByIdAsyncAction } from "../redux/thunk";
import { useDispatch } from "react-redux";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams(); 
    console.log(id);

    

    const [message, setMessage] = useState('');

    const THEM = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const customerData = {
            id: parseInt(id), // השתמש ב-ID מה-URL
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
        <ThemeProvider theme={THEM}>
            <h1>Sign Up</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <FormLabel>Id</FormLabel>
                    <Input placeholder="Your ID" value={id} readOnly onChange={(e) =>{if(id==undefined) setFirstName(e.target.value)} }/> 
                    <FormHelperText />
                </FormControl>
                <br />
                <FormControl required>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        placeholder="Write your first name here"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <FormHelperText />
                </FormControl>
                <br />
                <FormControl required>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        placeholder="Write your last name here"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>
                <br />
                <FormControl required>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        placeholder="Write your phone number here"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </FormControl>
                <br />
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Write your email here" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText />
                </FormControl>
                <br />
                <br />
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<SendIcon />} type="submit">
                        Continue
                    </Button>
                </Stack>
            </form>
            {message && <Typography variant="body2" color="error">{message}</Typography>} {/* הצגת ההודעה */}
        </ThemeProvider>
    );
};

export default SignUp;
