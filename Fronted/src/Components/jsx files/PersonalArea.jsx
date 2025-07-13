import { Navigate, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../css files/PersonalArea.css'; 

const PersonalArea = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate(`/Order/${id}`);
    };
    return (
        <div className="personal-area-container">
            <Button
                variant="outlined"
                startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                disabled
                className="personal-area-account-button"
            >
                {id}
            </Button>
            <h1 className="personal-area-title">Personal Area</h1> 
            <p className="personal-area-welcome-message">Welcome, {id}!</p> 
            <button onClick={handleOrderClick} className="personal-area-order-button">to order your event</button>
           <button onClick={() => navigate('/CreateFeedback')} className="personal-area-feedback-button">Create new feedback</button> 
        </div>
    );
};

export default PersonalArea;