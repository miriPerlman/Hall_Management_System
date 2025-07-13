import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { insertId } from "../../Redux/userSlice";
import { useState } from "react";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Checkbox,
    FormControlLabel,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Radio,
    RadioGroup,
    FormLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getInvitationsInNextMonth, getDetailsOfDate, createNewCustomerAsyncAction, getByIdAsyncAction, GetFirstDishSetails } from "../../Redux/thunk";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import '../css files/Order.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, daysDetails = {}, ...other } = props;
    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;
    const info = daysDetails[day.date()];

    let badgeContent = null;
    let disabled = false;

    if (isSelected && info) {
        if (info.morning && info.evening) {
            badgeContent = (
                <Tooltip title="בוקר: תפוס, ערב: תפוס" arrow>
                    <span className="server-day-x-badge">X</span> {/* Replaced inline style */}
                </Tooltip>
            );
            disabled = true;
        }
        else {
            badgeContent = (
                <Tooltip title={
                    <div>
                        בוקר: {info.morning ? "תפוס" : "פנוי"}
                        <br />
                        ערב: {info.evening ? "תפוס" : "פנוי"}
                    </div>
                }
                    arrow                >
                    <InfoIcon className="server-day-info-icon" /> {/* Replaced inline style */}
                </Tooltip>
            );
        }
    }

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={badgeContent}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                disabled={disabled}
            />
        </Badge>
    );
}
function DateCalendarServerRequest({ value, onChange, dispatch, getInvitationsInNextMonth, fetchDetailsOfDate }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([]);
    const [daysDetails, setDaysDetails] = React.useState({});
    const [selectedDate, setSelectedDate] = React.useState(
        value && dayjs(value).isValid() ? dayjs(value).startOf('day') : dayjs().startOf('day')
    );

    const fetchHighlightedDaysFromAPI = async (date) => {
        const month = date.month() + 1;
        const year = date.year();
        const onlyDate = date.format('YYYY-MM-DD');
        const obj = await fetchDetailsOfDate(onlyDate);
        console.log("morning:" + obj.morning);
        console.log("evening:" + obj.evening);
        try {
            const response = await dispatch(getInvitationsInNextMonth({ month, year }));
            if (getInvitationsInNextMonth.fulfilled.match(response)) {
                return response.payload;
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    };

    const fetchHighlightedDays = async (date) => {
        setIsLoading(true);
        const daysToHighlight = await fetchHighlightedDaysFromAPI(date);
        setHighlightedDays(daysToHighlight);

        const details = {};
        for (const dayNum of daysToHighlight) {
            const dayDate = dayjs(date).date(dayNum).format('YYYY-MM-DD');
            const info = await fetchDetailsOfDate(dayDate);
            details[dayNum] = info;
        }
        setDaysDetails(details);
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchHighlightedDays(selectedDate);
    }, []);

    const handleMonthChange = (date) => {
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={selectedDate}
                onChange={(newValue) => {
                    setSelectedDate(newValue);
                    if (onChange) onChange(newValue.format('YYYY-MM-DD'));
                }}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        highlightedDays,
                        daysDetails,
                    },
                }}
            />
        </LocalizationProvider>
    );
}

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

const Order = () => {
    const [openMenuDialog, setOpenMenuDialog] = useState(false);
    const [menuType, setMenuType] = useState("");
    const [selectedMenus, setSelectedMenus] = useState([]);
    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [guestFirstName, setGuestFirstName] = useState('');
    const [guestLastName, setGuestLastName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestMessage, setGuestMessage] = useState('');

    
    const firstDishSetails=useSelector(state=>state.dishes.firstDish);
    const regularMenus = ["מנה A", "מנה B", "מנה C"];
    const upgradedMenus = ["מנה X", "מנה Y", "מנה Z"];

    const handleMenuClick = (type) => {
        setMenuType(type);
        setOpenMenuDialog(true);
    };

    const handleMenuDialogClose = () => {
        setOpenMenuDialog(false);
    };
   
   const handleMenuCheck = (key) => {
    if (selectedMenus.includes(key)) {
        // אם המפתח כבר נבחר, הסר אותו
        setSelectedMenus(selectedMenus.filter(item => item !== key));
    } else {
        // אם המפתח לא נבחר, בדוק אם כבר נבחרו 2
        if (selectedMenus.length < 2) {
            setSelectedMenus([...selectedMenus, key]);
        } else {
            // הצג הודעה אם נבחרו יותר מ-2
            alert('אנא בחר 2 אפשרויות בלבד');
        }
    }
};

    const { name } = useParams();
    const id = useSelector(state => state.users.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dateDetails, setDateDetails] = useState(null);
    const [date, setDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [countOfDishes, setCountOfDishes] = useState("");
    const [isRegularDish, setIsRegularDish] = useState(false);
    const [isUpgradedDish, setIsUpgradedDish] = useState(false);
    const [numberOfWaiters, setNumberOfWaiters] = useState("");
    const [message, setMessage] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventTimeError, setEventTimeError] = useState("");
    const fetchDetailsOfDate = async (date) => {
        try {
            const response = await dispatch(getDetailsOfDate(date));
            if (getDetailsOfDate.fulfilled.match(response)) {
                return response.payload;
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    };
    const checkEnter = async (event) => {
        if (event.key === 'Enter') {
          
        }
    };
     useEffect(() => {
           dispatch(GetFirstDishSetails());
       }, [dispatch]);

    const handleChange = (event) => {
        dispatch(insertId(event.target.value));
    };
    const handleDateChange = async (selectedDate) => {
        const formatted = dayjs(selectedDate).format('YYYY-MM-DD');
        setDate(formatted);
        setShowCalendar(false);
        const details = await fetchDetailsOfDate(formatted);
        setDateDetails(details);
        setEventTime(""); 
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === 'guest') {
            setShowGuestPopup(true);
            return;
        }

        const order = {
            customerId: Number(id),
            date: date ? dayjs(date).format('YYYY-MM-DD') : "",
            countOfDishes: Number(countOfDishes),
            isRegularDish: !!isRegularDish,
            isUpgradedDish: !!isUpgradedDish,
            numberOfWaiters: Number(numberOfWaiters),
            eventTime,
        };

        try {
            const response = await fetch("http://localhost:5263/api/Invitations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                setMessage("The order was sent successfully!");
            } else {
                const errorText = await response.text();
                setMessage("An error occurred while sending the invitation: " + errorText);
            }
        } catch (error) {
            setMessage("Communication error with the server");
        }
    };

    const handleGuestSignUp = async (event) => {
        event.preventDefault();
        if (!guestFirstName || !guestLastName || !guestPhone || !guestEmail) {
            setGuestMessage('All fields must be filled in');
            return;
        }
        try {
            const customerData = {
                firstName: guestFirstName,
                lastName: guestLastName,
                phoneNum: guestPhone,
                email: guestEmail
            };
            const resultAction = await dispatch(createNewCustomerAsyncAction(customerData));
            if (createNewCustomerAsyncAction.fulfilled.match(resultAction)) {
             
                const getIdAction = await dispatch(getByIdAsyncAction(guestEmail));
                if (getByIdAsyncAction.fulfilled.match(getIdAction) && getIdAction.payload && getIdAction.payload.id) {
                    dispatch(insertId(getIdAction.payload.id));
                    setGuestMessage('You have successfully registered! You can now book an event.');
                    setTimeout(() => {
                        setShowGuestPopup(false);
                        setGuestMessage('');
                        navigate(`/Order/${guestFirstName}`);
                    }, 1200);
                } else {
                    setGuestMessage('You have successfully registered! Please log in.');
                }
            } else {
                setGuestMessage('Registration error: ' + (resultAction.error?.message || ''));
            }
        } catch (error) {
            setGuestMessage('Communication error: ' + error.message);
        }
    };

    const handleBackClick = () => {
        navigate(`/PersonalArea/${name}`);
    };

    return (
        <ThemeProvider theme={THEME}>
        <Box
            className="order-main-container"
            sx={{
                minHeight: '100vh',
                background: '#f7f7f9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 6,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    minWidth: 340,
                    maxWidth: 500,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 4px 24px #CDAA7D33',
                    background: '#fff',
                    mb: 3,
                }}
            >
                <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                        disabled
                        sx={{ fontWeight: 700, borderRadius: 2, px: 2, color: '#213547', borderColor: '#CDAA7D' }}
                    >
                        {name}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBackClick}
                        sx={{ fontWeight: 700, borderRadius: 2, px: 2, color: '#213547', borderColor: '#CDAA7D' }}
                    >
                     return
                    </Button>
                </Stack>
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 900, letterSpacing: 1, mb: 1 }}
                >
                   Event booking
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    gutterBottom
                    sx={{ mb: 2 }}
                >
                    hi {name}! please insert your event details.
                </Typography>
                <Box
                    component="form"
                    className="order-form"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    <Stack spacing={2}>
                        <TextField
                            label="ID"
                            value={id || ""}
                            onChange={handleChange}
                            onKeyDown={checkEnter}
                            fullWidth
                            variant="outlined"
                            InputProps={{ className: 'order-textfield-input' }}
                        />
                        <TextField
                            label="select a date"
                            value={date || ""}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                className: 'order-textfield-date-input',
                                onClick: () => setShowCalendar(true)
                            }}
                        />
                        <RadioGroup
                            row
                            value={eventTime}
                            onChange={e => {
                                if (!date) {
                                    setEventTimeError("You must select a date before selecting an event time");
                                    setEventTime("");
                                    return;
                                }
                                if (dateDetails) {
                                    if (e.target.value === "morning" && dateDetails.morning) {
                                        setEventTimeError("This morning on this date is already booked!");
                                        setEventTime("");
                                        return;
                                    }
                                    if (e.target.value === "evening" && dateDetails.evening) {
                                        setEventTimeError("This evening on this date is already booked!");
                                        setEventTime("");
                                        return;
                                    }
                                }
                                setEventTime(e.target.value);
                                setEventTimeError("");
                            }}
                        >
                            <FormControlLabel value="morning" control={<Radio />} label="בוקר" />
                            <FormControlLabel value="evening" control={<Radio />} label="ערב" />
                        </RadioGroup>
                        {eventTimeError && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {eventTimeError}
                            </Typography>
                        )}
                        {showCalendar && (
                            <Box className="order-calendar-overlay" sx={{
                                position: 'fixed',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.15)',
                                zIndex: 1300,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={() => setShowCalendar(false)} 
                            >
                                <Box className="order-calendar-box" onClick={e => e.stopPropagation()} sx={{
                                    background: '#fff',
                                    borderRadius: 3,
                                    p: 3,
                                    minWidth: 350,
                                    minHeight: 200,
                                    position: 'relative'
                                }}>
                                    <Button
                                        onClick={() => setShowCalendar(false)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            left: 8,
                                            minWidth: 0,
                                            color: '#CDAA7D',
                                            fontWeight: 700,
                                            fontSize: '1.2em'
                                        }}
                                    >X</Button>
                                    <DateCalendarServerRequest
                                        value={date}
                                        onChange={handleDateChange}
                                        dispatch={dispatch}
                                        getInvitationsInNextMonth={getInvitationsInNextMonth}
                                        fetchDetailsOfDate={fetchDetailsOfDate}
                                    />
                                </Box>
                            </Box>
                        )}
                        <TextField
                            label="count of dishes"
                            type="number"
                            value={countOfDishes || ""}
                            onChange={e => setCountOfDishes(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{ className: 'order-textfield-input' }}
                        />
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 1 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleMenuClick("regular")}
                                sx={{ fontWeight: 700, borderRadius: 2, px: 2 }}
                            >
                                Choosing a regular portion
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleMenuClick("upgraded")}
                                sx={{ fontWeight: 700, borderRadius: 2, px: 2 }}
                            >
                              Upgraded dish selection
                            </Button>
                        </Box>
                        {selectedMenus.length > 0 && (
                            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, background: '#f7f7f9' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    Selected menus:
                                </Typography>
                                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                                    {selectedMenus.map(menu => (
                                        <li key={menu}>{menu}</li>
                                    ))}
                                </Box>
                            </Paper>
                        )}
                        <TextField
                            label="count of waiters"
                            type="number"
                            value={numberOfWaiters || ""}
                            onChange={e => setNumberOfWaiters(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{ className: 'order-textfield-input' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
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
                            send order
                        </Button>
                        {message && (
                            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                                {message}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Paper>
            {/* Dialog for menu selection */}
            <Dialog open={openMenuDialog} onClose={handleMenuDialogClose}>
                <DialogTitle>
                    {menuType === "regular" ? "Select Standard Menus" : "Select Upgraded Menus"}
                </DialogTitle>
                <DialogContent>
                 <p>firstDish: please select 2 options</p>
                      <List>
    {(menuType === "regular" ? Object.entries(firstDishSetails) : Object.entries(upgradedMenus))
         .filter(([key, value]) => typeof value === 'boolean').map(([key, value]) => (
            <ListItem key={key} disablePadding>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedMenus.includes(key)}
                            onChange={() => handleMenuCheck(key)}
                        />
                    }
                    label={`${key}`} // מציג את המפתח ואת הערך
                />
            </ListItem>
        ))}
</List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMenuDialogClose}>closed</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showGuestPopup} onClose={() => setShowGuestPopup(false)}>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonAddAlt1Icon color="primary" /> הרשמה למערכת נדרשת
                </DialogTitle>
                <DialogContent>

                    <Typography color="error" sx={{ mb: 2 }}>
                        It is not possible to book an event as a guest. Please register in the system:
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleGuestSignUp}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 300 }}
                    >
                        <TextField
                            label="First Name"
                            value={guestFirstName}
                            onChange={e => setGuestFirstName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Last Name"
                            value={guestLastName}
                            onChange={e => setGuestLastName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Phone Number"
                            value={guestPhone}
                            onChange={e => setGuestPhone(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            value={guestEmail}
                            onChange={e => setGuestEmail(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
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
                           singup
                        </Button>
                        {guestMessage && (
                            <Typography variant="body2" color="success.main">
                                {guestMessage}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowGuestPopup(false)}>closed</Button>
                </DialogActions>
            </Dialog>
        </Box>
        </ThemeProvider>
    );
};

export default Order;