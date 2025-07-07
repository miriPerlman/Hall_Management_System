import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { insertId } from "../Redux/userSlice";
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
    ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getInvitationsInNextMonth, getDetailsOfDate } from "../Redux/thunk";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, daysDetails = {}, ...other } = props;
    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;
    const info = daysDetails[day.date()];

    let badgeContent = null;
    let disabled = false;

    if (isSelected && info) {
        if (info.morning && info.evening) {
            // גם בוקר וגם ערב תפוסים: X אדום עדין, לא ניתן לבחור
            badgeContent = (
                <Tooltip title="בוקר: תפוס, ערב: תפוס" arrow>
                    <span
                        style={{
                            color: '#d32f2f',
                            fontWeight: 500,
                            fontSize: 14,
                            padding: '0 2px',
                            letterSpacing: 1,
                            userSelect: 'none'
                        }}
                    >
                        X
                    </span>
                </Tooltip>
            );
            disabled = true; // לא ניתן לבחור יום זה}
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
                    <InfoIcon style={{ color: 'green', fontSize: 18, cursor: 'pointer' }} />
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

        // קריאה סדרתית (כל קריאה מחכה לקודמת)
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
                        daysDetails, // הוסף את זה!
                    },
                }}
            />
        </LocalizationProvider>
    );
};


// --- טופס ההזמנה ---
const Order = () => {
    const [openMenuDialog, setOpenMenuDialog] = useState(false);
    const [menuType, setMenuType] = useState(""); // "regular" או "upgraded"
    const [selectedMenu, setSelectedMenu] = useState(""); // לדוג' שם המנה שנבחרה
    const { name } = useParams();
    const id = useSelector(state => state.users.id);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // הוסף את זה אם לא קיים

    const [date, setDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [countOfDishes, setCountOfDishes] = useState("");
    const [isRegularDish, setIsRegularDish] = useState(false);
    const [isUpgradedDish, setIsUpgradedDish] = useState(false);
    const [numberOfWaiters, setNumberOfWaiters] = useState("");
    const [message, setMessage] = useState("");
    const handleMenuClick = (type) => {
    setMenuType(type);
    setOpenMenuDialog(true);
};
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
            await dispatch(fetchDataAsyncAction2());
        }
    };

    const handleChange = (event) => {
        dispatch(insertId(event.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            customerId: Number(id),
            date: date ? dayjs(date).format('YYYY-MM-DD') : "",
            countOfDishes: Number(countOfDishes),
            isRegularDish: !!isRegularDish,
            isUpgradedDish: !!isUpgradedDish,
            numberOfWaiters: Number(numberOfWaiters)
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
                setMessage("ההזמנה נשלחה בהצלחה!");
                // אפשר לאפס שדות כאן אם רוצים
            } else {
                const errorText = await response.text();
                setMessage("אירעה שגיאה בשליחת ההזמנה: " + errorText);
            }
        } catch (error) {
            setMessage("שגיאת תקשורת עם השרת");
        }
    };

    const handleBackClick = () => {
        navigate(`/PersonalArea/${name}`);
    };

    const customFontStyle = {
        fontFamily: 'Sanchez Condensed',
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            <Button
                variant="outlined"
                startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                disabled
                sx={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    zIndex: 2000,
                    background: '#181818 !important', // שחור כהה
                    color: '#CDAA7D !important',      // זהב
                    textTransform: 'none',
                    borderColor: '#CDAA7D !important',
                    borderRadius: 2,
                    fontFamily: 'Sanchez Condensed',
                    fontWeight: 700,
                    fontSize: '1.1em',
                    opacity: 1,
                    cursor: 'default',
                    boxShadow: '0 2px 8px #CDAA7D22',
                    letterSpacing: 1,
                    px: 5, // צר יותר
                    py: 0.5, // צר יותר
                    minWidth: 0,
                    borderWidth: 1.5,
                    borderStyle: 'solid',
                    paddingLeft: '13px !important',
                    paddingRight: '13px !important',
                    '& .MuiButton-startIcon': {
                        marginRight: 1,
                    },
                    '&.Mui-disabled': {
                        color: '#CDAA7D !important',
                        borderColor: '#CDAA7D !important',
                        background: '#181818 !important',
                        opacity: 1,
                    },
                }}
            >
                {name}
            </Button>
            {/* כפתור חזור בצד שמאל למטה */}
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBackClick}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: 24,
                    zIndex: 2000,
                    background: '#fff',
                }}
            >
                חזור
            </Button>
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    px: 3,
                    py: 5,
                    borderRadius: 2,
                    background: '#fff',
                    border: '1.5px solid #CDAA7D',
                    boxShadow: '0 4px 24px 0 rgba(205,170,125,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        letterSpacing: 2,
                        mb: 2,
                        textShadow: '0 2px 8px #0001',
                        fontFamily: 'Sanchez Condensed',
                    }}
                >
                    הזמנת אירוע
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    gutterBottom
                    sx={{ mb: 3, fontWeight: 500, opacity: 0.85, textAlign: 'center' }}
                >
                    hi {name}! please insert your event details .
                </Typography>
                <Box
                    component="form"
                    sx={{ width: '100%' }}
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2}>
                        <TextField
                            label="ID"
                            value={id || ""}
                            onChange={handleChange}
                            onKeyDown={checkEnter}
                            fullWidth
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <TextField
                            label="select a date"
                            value={date || ""}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                sx: { borderRadius: 2, background: "#f5f5f5", cursor: "pointer" },
                                onClick: () => setShowCalendar(true)
                            }}
                        />
                        {showCalendar && (
                            <Box sx={{
                                position: "fixed",
                                top: 0, left: 0, width: "100vw", height: "100vh",
                                background: "rgba(0,0,0,0.2)",
                                zIndex: 1200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                                onClick={() => setShowCalendar(false)}
                            >
                                <Box
                                    sx={{
                                        background: "#fff",
                                        border: "1px solid #ccc",
                                        borderRadius: 2,
                                        boxShadow: 4,
                                        p: 2,
                                        zIndex: 1300
                                    }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <DateCalendarServerRequest
                                        value={date}
                                        onChange={(selectedDate) => {
                                            setDate(dayjs(selectedDate).format('YYYY-MM-DD'));
                                            setShowCalendar(false);
                                        }}
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
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!isRegularDish}
                                    onChange={e => {
                                        setIsRegularDish(e.target.checked);
                                        if (e.target.checked) setIsUpgradedDish(false);
                                        handleMenuClick("regular");
                                    }}
                                    color="primary"
                                />
                            }
                            label="מנה רגילה"
                            sx={{ ml: 0 }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!isUpgradedDish}
                                    onChange={e => {
                                        setIsUpgradedDish(e.target.checked);
                                        if (e.target.checked) setIsRegularDish(false);
                                        handleMenuClick("upgraded");
                                    }}
                                    color="primary"
                                />
                            }
                            label="מנה משודרגת"
                            sx={{ ml: 0 }}
                        />
                        <TextField
                            label="count of waiters"
                            type="number"
                            value={numberOfWaiters || ""}
                            onChange={e => setNumberOfWaiters(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                mt: 2,
                                fontWeight: 700,
                                fontSize: '1.1em',
                                borderRadius: 2,
                                py: 1.5,
                                boxShadow: '0 2px 8px #0006',
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
            <Dialog open={openMenuDialog} onClose={() => setOpenMenuDialog(false)}>
                <DialogTitle>
                    {menuType === "regular" ? "בחר מנה רגילה" : "בחר מנה משודרגת"}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {(menuType === "regular"
                            ? ["שניצל", "קציצות", "פסטה"]
                            : ["סטייק", "דג סלמון", "פילה עוף"]).map(menu => (
                            <ListItem key={menu} disablePadding>
                                <ListItemButton onClick={() => { setSelectedMenu(menu); setOpenMenuDialog(false); }}>
                                    <ListItemText primary={menu} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenMenuDialog(false)}>סגור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Order;