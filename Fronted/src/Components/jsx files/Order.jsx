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
import { getInvitationsInNextMonth, getDetailsOfDate } from "../../Redux/thunk";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import '../css files/Order.css'; 

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
        // requestAbortController is not defined here, consider adding it if needed
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


const Order = () => {
    const [openMenuDialog, setOpenMenuDialog] = useState(false);
    const [menuType, setMenuType] = useState("");
    const [selectedMenus, setSelectedMenus] = useState([]);

    const regularMenus = ["מנה א", "מנה ב", "מנה ג"];
    const upgradedMenus = ["מנה X", "מנה Y", "מנה Z"];

    const handleMenuClick = (type) => {
        setMenuType(type);
        setOpenMenuDialog(true);
    };

    const handleMenuDialogClose = () => {
        setOpenMenuDialog(false);
    };

    const handleMenuCheck = (menu) => {
        setSelectedMenus((prev) =>
            prev.includes(menu)
                ? prev.filter((m) => m !== menu)
                : [...prev, menu]
        );
    };

    const { name } = useParams();
    const id = useSelector(state => state.users.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [countOfDishes, setCountOfDishes] = useState("");
    const [isRegularDish, setIsRegularDish] = useState(false);
    const [isUpgradedDish, setIsUpgradedDish] = useState(false);
    const [numberOfWaiters, setNumberOfWaiters] = useState("");
    const [message, setMessage] = useState("");
    const [eventTime, setEventTime] = useState("");

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
            // fetchDataAsyncAction2 is not defined in current thunk.js
            // await dispatch(fetchDataAsyncAction2());
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
                setMessage("ההזמנה נשלחה בהצלחה!");
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

    return (
        <Box className="order-main-container"> {/* Replaced sx prop */}
            <Button
                variant="outlined"
                startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                disabled
                className="order-account-button" // Replaced sx prop
            >
                {name}
            </Button>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBackClick}
                className="order-back-button" // Replaced sx prop
            >
                חזור
            </Button>
            <Paper
                elevation={4}
                className="order-form-paper" // Replaced sx prop
            >
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                    className="order-title" // Replaced sx prop
                >
                    הזמנת אירוע
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    gutterBottom
                    className="order-subtitle" // Replaced sx prop
                >
                    hi {name}! please insert your event details .
                </Typography>
                <Box
                    component="form"
                    className="order-form" // Replaced sx prop
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
                            InputProps={{ className: 'order-textfield-input' }} // Replaced sx prop
                        />
                        <TextField
                            label="select a date"
                            value={date || ""}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                className: 'order-textfield-date-input', // Replaced sx prop
                                onClick: () => setShowCalendar(true)
                            }}
                        />
                        <RadioGroup
                            row
                            value={eventTime}
                            onChange={e => setEventTime(e.target.value)}
                        >
                            <FormControlLabel value="morning" control={<Radio />} label="בוקר" />
                            <FormControlLabel value="evening" control={<Radio />} label="ערב" />
                        </RadioGroup>
                        {showCalendar && (
                            <Box className="order-calendar-overlay"> {/* Replaced sx prop */}
                                <Box className="order-calendar-box" onClick={e => e.stopPropagation()}> {/* Replaced sx prop */}
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
                            InputProps={{ className: 'order-textfield-input' }} // Replaced sx prop
                        />

                        <Box className="order-menu-type-selection"> {/* Replaced sx prop */}
                            <Typography
                                variant="body1"
                                onClick={() => handleMenuClick("regular")}
                                className="order-menu-type-button" // Replaced sx prop
                            >
                                בחירת מנה רגילה
                            </Typography>
                            <Typography
                                variant="body1"
                                onClick={() => handleMenuClick("upgraded")}
                                className="order-menu-type-button" // Replaced sx prop
                            >
                                בחירת מנה משודרגת
                            </Typography>
                        </Box>

                        {selectedMenus.length > 0 && (
                            <Paper elevation={1} className="order-selected-menus-paper"> {/* Replaced sx prop */}
                                <Typography variant="subtitle2" className="order-selected-menus-title"> {/* Replaced sx prop */}
                                    תפריטים שנבחרו:
                                </Typography>
                                <Box component="ul" className="order-selected-menus-list"> {/* Replaced sx prop */}
                                    {selectedMenus.map(menu => (
                                        <li key={menu} className="order-selected-menu-item">{menu}</li>
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
                            InputProps={{ className: 'order-textfield-input' }} // Replaced sx prop
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="order-submit-button" // Replaced sx prop
                        >
                            send order
                        </Button>
                        {message && (
                            <Typography variant="body2" className="order-message-text" color="success.main"> {/* Replaced sx prop */}
                                {message}
                            </Typography>
                        )}
                    </Stack>
                </Box>
            </Paper>

            <Dialog open={openMenuDialog} onClose={handleMenuDialogClose}>
                <DialogTitle>
                    {menuType === "regular" ? "בחר תפריטים רגילים" : "בחר תפריטים משודרגים"}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {(menuType === "regular" ? regularMenus : upgradedMenus).map((menu) => (
                            <ListItem key={menu} disablePadding>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedMenus.includes(menu)}
                                            onChange={() => handleMenuCheck(menu)}
                                        />
                                    }
                                    label={menu}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMenuDialogClose}>סגור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Order;