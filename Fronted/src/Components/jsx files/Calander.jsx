import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import '../css files/Calender.css'; 

const Calendar = () => {
    const navigate = useNavigate();
    const initialValue = dayjs(Date.now());

    async function fetchHighlightedDaysFromAPI(date) {
        const month = date.month() + 1;
        const year = date.year();

        try {
            const response = await fetch(`http://localhost:5263/api/invitations/${month}/${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return { daysToHighlight: data };
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

        const handleDoubleClick = () => {
            navigate(`/Order/`);
        };

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <span className="calendar-badge-x">X</span> : undefined} 
            >
                <PickersDay
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                    onDoubleClick={handleDoubleClick}
                />
            </Badge>
        );
    }

    function DateCalendarServerRequest() {
        const requestAbortController = React.useRef(new AbortController());
        const [isLoading, setIsLoading] = React.useState(false);
        const [highlightedDays, setHighlightedDays] = React.useState([]);

        const fetchHighlightedDays = (date) => {
            setIsLoading(true);
            fetchHighlightedDaysFromAPI(date)
                .then(({ daysToHighlight }) => {
                    setHighlightedDays(daysToHighlight);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setIsLoading(false);
                });
        };

        React.useEffect(() => {
            fetchHighlightedDays(initialValue);
            return () => requestAbortController.current.abort();
        }, []);

        const handleMonthChange = (date) => {
            if (requestAbortController.current) {
                requestAbortController.current.abort();
            }
            setHighlightedDays([]);
            fetchHighlightedDays(date);
        };

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    defaultValue={initialValue}
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        },
                    }}
                />
            </LocalizationProvider>
        );
    }

    return (
        <Box className="calendar-container"> {/* Added a wrapper Box for styling */}
            <DateCalendarServerRequest />
        </Box>
    );
}

export default Calendar;