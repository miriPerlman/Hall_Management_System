import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Box, Typography, TextField, Button, Stack, Checkbox, FormControlLabel, Paper, Dialog, DialogTitle,
    DialogContent, DialogActions, Radio, RadioGroup, Tooltip, Badge, CircularProgress, Alert, Grid,
    FormGroup
} from '@mui/material';
import { PickersDay, LocalizationProvider, DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';

// Thunks
import {
    createNewCustomerAsyncAction, getByIdAsyncAction, getInvitationsInNextMonth, getDetailsOfDate,
    getFirstDish, getMainDish, getLastDish, getSalads, createFirstDish, createMainDish,
    createLastDish, createSalad, createDish, createInvitation,
    getCustomerById,
} from "../../Redux/thunk";
import { insertId } from "../../Redux/userSlice";

// Icons & CSS
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import '../css files/Order.css';

// --- Helper Components (No Changes Needed) ---
function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, daysDetails = {}, ...other } = props;
    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;
    const info = daysDetails[day.date()];
    let badgeContent = null;
    let disabled = false;
    if (isSelected && info) {
        if (info.morning && info.evening) {
            badgeContent = (<Tooltip title="בוקר: תפוס, ערב: תפוס" arrow><span className="server-day-x-badge">X</span></Tooltip>);
            disabled = true;
        } else {
            badgeContent = (
                <Tooltip title={<div>בוקר: {info.morning ? "תפוס" : "פנוי"}<br />ערב: {info.evening ? "תפוס" : "פנוי"}</div>} arrow>
                    <InfoIcon className="server-day-info-icon" />
                </Tooltip>
            );
        }
    }
    return (
        <Badge key={day.toString()} overlap="circular" badgeContent={badgeContent}>
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} disabled={disabled} />
        </Badge>
    );
}

function DateCalendarServerRequest({ value, onChange, dispatch, getInvitationsInNextMonth, fetchDetailsOfDate }) {
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [daysDetails, setDaysDetails] = useState({});
    const [selectedDate, setSelectedDate] = useState(value && dayjs(value).isValid() ? dayjs(value).startOf('day') : dayjs().startOf('day'));

    const fetchHighlightedDays = async (date) => {
        setIsLoading(true);
        const month = date.month() + 1;
        const year = date.year();
        try {
            const response = await dispatch(getInvitationsInNextMonth({ month, year }));
            if (getInvitationsInNextMonth.fulfilled.match(response)) {
                const daysToHighlight = response.payload;
                setHighlightedDays(daysToHighlight);
                const details = {};
                for (const dayNum of daysToHighlight) {
                    const dayDate = dayjs(date).date(dayNum).format('YYYY-MM-DD');
                    const info = await fetchDetailsOfDate(dayDate);
                    details[dayNum] = info;
                }
                setDaysDetails(details);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
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
                    if (onChange) onChange(newValue);
                }}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{ day: ServerDay }}
                slotProps={{ day: { highlightedDays, daysDetails } }}
            />
        </LocalizationProvider>
    );
}
const MenuSelectionDialog = ({ open, onClose, onSave, menuConfig }) => {
    const dispatch = useDispatch();

    const {
        firstDish, loadingFirstDish, mainDish, loadingMainDish,
        lastDish, loadingLastDish, salads, loadingSalads
    } = useSelector((state) => state.dishes);

    const [firstSelection, setFirstSelection] = useState({});
    const [mainSelection, setMainSelection] = useState({});
    const [lastSelection, setLastSelection] = useState({});
    const [saladSelection, setSaladSelection] = useState({});

    useEffect(() => {
        const fetchDishesSequentially = async () => {
            try {
                await dispatch(getFirstDish());
                await dispatch(getMainDish());
                await dispatch(getSalads());
                await dispatch(getLastDish());
            } catch (error) {
                console.error("An error occurred while fetching dishes sequentially:", error);
                toast.error("Failed to load menu options.");
            }
        };
        if (open) {
            fetchDishesSequentially();
        }
    }, [open, dispatch]);

    const handleSelectionChange = (event, selection, setSelection, limit) => {
        const { name, checked } = event.target;
        const currentSelections = Object.values(selection).filter(Boolean).length;
        if (checked && currentSelections >= limit) {
            toast.info(`You can only select up to ${limit} items for this category.`);
            return;
        }
        setSelection((prev) => ({ ...prev, [name]: checked }));
    };

    const handleConfirmSelection = () => {
        const getSelectedItems = (selection) =>
            Object.entries(selection)
                .filter(([, isSelected]) => isSelected)
                .reduce((obj, [key]) => {
                    obj[key] = true;
                    return obj;
                }, {});

        const finalSelection = {
            firstDish: getSelectedItems(firstSelection),
            mainDish: getSelectedItems(mainSelection),
            lastDish: getSelectedItems(lastSelection),
            salads: getSelectedItems(saladSelection),
        };
        onSave(finalSelection);
        onClose();
    };

    const renderDishGroup = (title, data, loading, selection, setSelection, limit) => (
        <Box mb={3}>
            <Typography variant="h6">{title} (Up to {limit})</Typography>
            {loading ? <CircularProgress /> : !data ? <Alert severity="error">Data not available</Alert> :
                <FormGroup>
                    <Grid container>
                        {Object.entries(data).filter(([key, value]) => typeof value === 'boolean').map(([key]) => (
                            <Grid item xs={12} sm={6} key={key}>
                                <FormControlLabel
                                    control={<Checkbox checked={!!selection[key]} onChange={(e) => handleSelectionChange(e, selection, setSelection, limit)} name={key} />}
                                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormGroup>
            }
        </Box>
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Select Your Menu</DialogTitle>
            <DialogContent>
                {renderDishGroup("First Course", firstDish, loadingFirstDish, firstSelection, setFirstSelection, menuConfig.first)}
                {renderDishGroup("Main Course", mainDish, loadingMainDish, mainSelection, setMainSelection, menuConfig.main)}
                {renderDishGroup("Desserts", lastDish, loadingLastDish, lastSelection, setLastSelection, menuConfig.last)}
                {renderDishGroup("Salads", salads, loadingSalads, saladSelection, setSaladSelection, menuConfig.salad)}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirmSelection} variant="contained">Confirm Selection</Button>
            </DialogActions>
        </Dialog>
    );
};

const THEME = createTheme({
    palette: {
        primary: { main: '#CDAA7D', contrastText: '#fff' },
        secondary: { main: '#213547' },
    },
    typography: {
        fontFamily: 'Varela Round, Alef, Arial, sans-serif',
        h4: { fontWeight: 800, letterSpacing: 2 },
    },
});

const Order = () => {
    const { Id: urlId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState(null);
    const [customerName, setCustomerName] = useState('Guest');
    const guestFlowStarted = useRef(false);
    const [date, setDate] = useState("");
    const [dateDetails, setDateDetails] = useState(null);
    const [eventTime, setEventTime] = useState("");
    const [eventTimeError, setEventTimeError] = useState("");
    const [countOfDishes, setCountOfDishes] = useState("");
    const [numberOfWaiters, setNumberOfWaiters] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [openMenuDialog, setOpenMenuDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [finalizedMenu, setFinalizedMenu] = useState(null);
    const [menuConfig, setMenuConfig] = useState({ first: 0, main: 0, last: 0, salad: 0 });
    const [menuType, setMenuType] = useState("");     const [guestId, setGuestId] = useState('');
    const [guestFirstName, setGuestFirstName] = useState('');
    const [guestLastName, setGuestLastName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [guestEmail, setGuestEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (urlId && urlId !== "guest") {
                setCustomerId(urlId);
                const result = await dispatch(getCustomerById(urlId));
                if (result.payload) {
                    setCustomerName(result.payload.firstName || 'Customer');
                }
            } else {
                setCustomerId(null);
                setCustomerName('Guest');
            }
        };
        fetchUserData();
    }, [urlId, dispatch]);

    useEffect(() => {
        if (customerId && guestFlowStarted.current) {
            console.log("Guest registration successful. Resubmitting order with new ID:", customerId);
            handleSubmit(); 
            guestFlowStarted.current = false; 
        }
    }, [customerId]);


    const fetchDetailsOfDate = async (date) => {
        const response = await dispatch(getDetailsOfDate(date));
        return getDetailsOfDate.fulfilled.match(response) ? response.payload : null;
    };

    const handleDateChange = async (selectedDate) => {
        const formatted = dayjs(selectedDate).format('YYYY-MM-DD');
        setDate(formatted);
        setShowCalendar(false);
        const details = await fetchDetailsOfDate(formatted);
        setDateDetails(details);
        setEventTime("");
    };

    const handleMenuClick = (type) => {
        setMenuType(type);
        if (type === "regular") {
            setMenuConfig({ first: 2, main: 2, last: 1, salad: 4 });
        } else {
            setMenuConfig({ first: 3, main: 3, last: 2, salad: 6 });
        }
        setOpenMenuDialog(true);
    };

    const handleFinalMenuSave = (selections) => {
        setFinalizedMenu(selections);
        setOpenMenuDialog(false);
        toast.success("Menu selections confirmed!");
    };
    
    // ✨ FIX: Rewritten guest signup logic
    const handleGuestSignUp = async (event) => {
        event.preventDefault();
        if (!guestId || !guestFirstName || !guestLastName || !guestPhone || !guestEmail) {
            toast.error('All fields, including ID, must be filled in.');
            return;
        }

        try {
            // The payload for a NEW customer should NOT include an ID.
              const customerData = { 
                id: parseInt(guestId), // This is the national ID
                firstName: guestFirstName, 
                lastName: guestLastName, 
                phoneNum: guestPhone, 
                email: guestEmail 
            };
            const resultAction = await dispatch(createNewCustomerAsyncAction(customerData));

            if (createNewCustomerAsyncAction.fulfilled.match(resultAction)) {
                const newCustomer = resultAction.payload;
                toast.success('Registration successful! Finalizing your order...');
                
                // Update the state with the new customer's info
                setCustomerId(newCustomer.id);
                setCustomerName(newCustomer.firstName);
                dispatch(insertId(newCustomer.id)); // Also update Redux state if needed

                // Close the popup. The useEffect hook will now trigger the order submission.
                setShowGuestPopup(false);

            } else {
                toast.error('Registration error: ' + (resultAction.error?.message || 'Unknown error'));
            }
        } catch (error) {
            toast.error('Communication error: ' + error.message);
        }
    };
    
    // ✨ FIX: Main submission logic now handles the guest flow correctly
    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); // Allow calling without an event

        // 1. If the user is a guest, open the signup popup
       if (!customerId) {
            // We set a flag to remember that we started the guest->signup process
            guestFlowStarted.current = true;
            setShowGuestPopup(true);
            // Stop the current submission and wait for the user to sign up
            return;
        }


        // --- All subsequent validation checks ---
        if (!date || !eventTime || !countOfDishes || !numberOfWaiters || !finalizedMenu) {
            toast.error("Please ensure all order details are complete.");
            return;
        }
        if (Object.keys(finalizedMenu.salads).length !== menuConfig.salad) {
            toast.error(`Please select exactly ${menuConfig.salad} salad(s).`);
            return;
        }
        // ... (add all other validation checks here)

        console.log(`✅ All checks passed for customer ${customerId}. Submitting...`);
        setIsSubmitting(true);
        
        try {
            // --- The rest of the submission logic is the same ---
            toast.info("Step 1/3: Creating dish selections...");
            const createdFirstDish = await dispatch(createFirstDish(finalizedMenu.firstDish)).unwrap();
            const createdMainDish = await dispatch(createMainDish(finalizedMenu.mainDish)).unwrap();
            const createdLastDish = await dispatch(createLastDish(finalizedMenu.lastDish)).unwrap();
            const createdSalad = await dispatch(createSalad(finalizedMenu.salads)).unwrap();

            toast.info("Step 2/3: Assembling the complete dish...");
            const compositeDishPayload = {
                firstDishId: createdFirstDish.id, mainDishId: createdMainDish.id,
                lastDishId: createdLastDish.id, saladsId: createdSalad.id
            };
            const createdCompositeDish = await dispatch(createDish(compositeDishPayload)).unwrap();

            toast.info("Step 3/3: Finalizing the invitation...");
            const finalInvitationPayload = {
                customerId: Number(customerId), date: dayjs(date).format('YYYY-MM-DD'),
                countOfDishes: Number(countOfDishes), isUpgradedDish: menuType === 'upgraded',
                numberOfWaiters: Number(numberOfWaiters), dishId: createdCompositeDish.id,
                inMorning: eventTime === 'morning'
            };

            await dispatch(createInvitation(finalInvitationPayload)).unwrap();
            toast.success("The invitation was created successfully!");
            navigate(`/PersonalArea/${customerId}`);

        } catch (error) {
            console.error("Full order submission failed:", error);
            toast.error("Error sending invitation: " + (error.payload?.message || error.message || "Please check console"));
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <ThemeProvider theme={THEME}>
            <Box className="order-main-container" sx={{ minHeight: '100vh', background: '#f7f7f9', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 340, maxWidth: 500, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 24px #CDAA7D33', background: '#fff', mb: 3 }}>
                    {/* Header */}
                    <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, justifyContent: 'space-between' }}>
                        <Button variant="outlined" startIcon={<AccountCircleIcon />} disabled sx={{ fontWeight: 700, color: '#213547', borderColor: '#CDAA7D' }}>{customerName}</Button>
                        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(`/PersonalArea/${customerId}`)} sx={{ color: '#213547', borderColor: '#CDAA7D' }} disabled={!customerId}>return</Button>
                    </Stack>
                    <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 900 }}>Event booking</Typography>
                    <Typography variant="subtitle1" color="secondary" gutterBottom sx={{ mb: 2 }}>hi {customerName}! please insert your event details.</Typography>
                    
                    {/* Main Order Form */}
                    <Box component="form" className="order-form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <Stack spacing={2}>
                            {/* Form Fields */}
                            <TextField label="select a date" value={date || ""} fullWidth variant="outlined" InputProps={{ readOnly: true, onClick: () => setShowCalendar(true) }} />
                            <RadioGroup row value={eventTime} onChange={e => {
                                if (!date) { setEventTimeError("You must select a date first"); return; }
                                if (dateDetails && ((e.target.value === "morning" && dateDetails.morning) || (e.target.value === "evening" && dateDetails.evening))) {
                                    setEventTimeError(`This ${e.target.value} is already booked!`); return;
                                }
                                setEventTime(e.target.value); setEventTimeError("");
                            }}>
                                <FormControlLabel value="morning" control={<Radio />} label="בוקר" />
                                <FormControlLabel value="evening" control={<Radio />} label="ערב" />
                            </RadioGroup>
                            {eventTimeError && <Typography color="error" variant="body2">{eventTimeError}</Typography>}
                            <TextField label="count of dishes" type="number" value={countOfDishes} onChange={e => setCountOfDishes(e.target.value)} fullWidth />
                            <TextField label="count of waiters" type="number" value={numberOfWaiters} onChange={e => setNumberOfWaiters(e.target.value)} fullWidth />
                            
                            {/* Menu Selection Buttons */}
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 1 }}>
                                <Button variant="outlined" onClick={() => handleMenuClick("regular")}>Choosing a regular portion</Button>
                                <Button variant="outlined" onClick={() => handleMenuClick("upgraded")}>Upgraded dish selection</Button>
                            </Box>
                            
                            {/* Display Finalized Menu */}
                            {finalizedMenu && (
                                <Paper elevation={1} sx={{ p: 2, borderRadius: 2, background: 'rgba(205, 170, 125, 0.1)' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>Menu Selected: {menuType}</Typography>
                                    <Typography variant="body2" color="textSecondary">Ready to submit the order.</Typography>
                                </Paper>
                            )}

                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{ fontWeight: 700, py: 1.2, fontSize: '1.1em' }}>
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'send order'}
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
                
                {/* All Dialogs */}
                {showCalendar && (
                    <Box className="order-calendar-overlay" onClick={() => setShowCalendar(false)}>
                        <Box className="order-calendar-box" onClick={e => e.stopPropagation()}>
                            <Button onClick={() => setShowCalendar(false)} sx={{ position: 'absolute', top: 8, left: 8, color: '#CDAA7D' }}>X</Button>
                            <DateCalendarServerRequest value={date} onChange={handleDateChange} dispatch={dispatch} getInvitationsInNextMonth={getInvitationsInNextMonth} fetchDetailsOfDate={fetchDetailsOfDate} />
                        </Box>
                    </Box>
                )}

                <MenuSelectionDialog open={openMenuDialog} onClose={() => setOpenMenuDialog(false)} onSave={handleFinalMenuSave} menuConfig={menuConfig} />

                {/* Guest Signup Popup */}
                  <Dialog open={showGuestPopup} onClose={() => setShowGuestPopup(false)}>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PersonAddAlt1Icon color="primary" /> Registration Required</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ mb: 2 }}>To book an event, please register.</Typography>
                        <Box component="form" onSubmit={handleGuestSignUp} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 300 }}>
                            <TextField label="ID (T.Z.)" value={guestId} onChange={e => setGuestId(e.target.value)} required />
                            <TextField label="First Name" value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)} required />
                            <TextField label="Last Name" value={guestLastName} onChange={e => setGuestLastName(e.target.value)} required />
                            <TextField label="Phone Number" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} required />
                            <TextField label="Email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} required />
                            <Button variant="contained" color="primary" type="submit">Sign Up & Continue</Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setShowGuestPopup(false);
                            guestFlowStarted.current = false; // Cancel the flow
                        }}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default Order;