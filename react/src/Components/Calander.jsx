import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // הוספת import עבור useNavigate
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const Calendar = () => {
    const navigate = useNavigate(); // יצירת אובייקט navigate
    const initialValue = dayjs(Date.now());

    async function fetchHighlightedDaysFromAPI(date) {
        const month = date.month() + 1; // חודש נוכחי (1-12)
        const year = date.year(); // שנה נוכחית

        try {
            const response = await fetch(`http://localhost:5263/api/invitations/${month}/${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return { daysToHighlight: data };
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; // טיפול בשגיאה אחר אם יש צורך
        }
    }

    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

        const handleDoubleClick = () => {
            // שינוי הניתוב בלחיצה כפולה
            navigate(`/Order/`); // שנה את הנתיב בהתאם
        };

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <span style={{ color: 'red' }}>X</span> : undefined}
            >
                <PickersDay
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                    onDoubleClick={handleDoubleClick} // הוספת אירוע לחיצה כפולה
                />
            </Badge>
        );
    }

    function DateCalendarServerRequest() {
        const requestAbortController = React.useRef(new AbortController());
        const [isLoading, setIsLoading] = React.useState(false);
        const [highlightedDays, setHighlightedDays] = React.useState([]);

        const fetchHighlightedDays = (date) => {
            setIsLoading(true); // הגדרת isLoading ל-true
            fetchHighlightedDaysFromAPI(date)
                .then(({ daysToHighlight }) => {
                    setHighlightedDays(daysToHighlight);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setIsLoading(false); // לא לשכוח להפסיק את ה-loading גם במקרה של שגיאה
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

    return <DateCalendarServerRequest />;
}

export default Calendar;
