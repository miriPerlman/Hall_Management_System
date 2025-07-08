import { Navigate, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../css files/PersonalArea.css'; // New import

const PersonalArea = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate(`/Order/${name}`);
    };
    return (
        <div className="personal-area-container"> {/* Added wrapper div */}
            <Button
                variant="outlined"
                startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                disabled
                className="personal-area-account-button" // Replaced sx prop
            >
                {name}
            </Button>
            <h1 className="personal-area-title">Personal Area</h1> {/* Added className */}
            <p className="personal-area-welcome-message">Welcome, {name}!</p> {/* Added className */}
            <button onClick={handleOrderClick} className="personal-area-order-button">to order your event</button> {/* Added className */}
           <button onClick={() => navigate('/CreateFeedback')} className="personal-area-feedback-button">יצירת משוב חדש</button> {/* Added className */}
        </div>
    );
};

export default PersonalArea;