import { Navigate, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PersonalArea = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate(`/Order/${name}`);
    };
    return (
        <div>
            {/* כפתור שם משתמש בצד ימין למעלה */}
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
                        marginRight:1,
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
            <h1>Personal Area</h1>
            <p>Welcome, {name}!</p>
            <button onClick={handleOrderClick}>to order your event</button>
           <button onClick={() => navigate('/CreateFeedback')}>יצירת משוב חדש</button>
        </div>
    );
};

export default PersonalArea;