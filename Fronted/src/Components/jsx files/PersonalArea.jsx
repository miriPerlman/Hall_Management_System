import { useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import '../css files/PersonalArea.css';
import '../css files/CreateFeedback.css'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllOrderHistory, getCustomerById } from "../../Redux/thunk";


const parseOrderHistoryResponse = (response) => {
    if (!response ) {
        return [];
    }

    const values = response;
    const referenceMap = {};

    values.forEach(item => {
        if (item && item.$id) {
            referenceMap[item.$id] = item;
        }
    });
  const rehydratedOrders = values.map(item => {
        if (item && item.$ref) {
            return referenceMap[item.$ref]; 
        }
        return item; 
    });

    return rehydratedOrders.filter(order => order && order.id);
};


const PersonalArea = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderHistory, setOrderHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await dispatch(getCustomerById(id));
                if (result.payload) {
                    setFirstName(result.payload.firstName || '');
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, [id, dispatch]);

    const handleOrderClick = () => {
        navigate(`/Order/${id}`);
    };

    const handleOrderHistoryClick = async () => {
        try {
            const result = await dispatch(GetAllOrderHistory(id));
            const rawData = result.payload || result;
            const parsedData = parseOrderHistoryResponse(rawData);
            setOrderHistory(parsedData);
            setShowHistory(true);
        } catch (error) {
            console.error("Failed to fetch order history:", error);
            setOrderHistory([]);
        }
    };

    const handleDateClick = (order) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrder(null);
    };

    return (
        <div className="personal-area-container">
            <Button
                variant="outlined"
                startIcon={<AccountCircleIcon sx={{ color: '#CDAA7D' }} />}
                disabled
                className="personal-area-account-button"
            >
                {firstName}
            </Button>
            <h1 className="personal-area-title">Personal Area</h1>
            <p className="personal-area-welcome-message">Welcome, {firstName}!</p>
            <button onClick={handleOrderClick} className="personal-area-order-button">to order your event</button>
            <button onClick={() => navigate('/CreateFeedback')} className="personal-area-feedback-button">Create new feedback</button>
            <button onClick={handleOrderHistoryClick} className="personal-area-order-button">Order history</button>
            
            {showHistory && (
                <div style={{ border: "1px solid #CDAA7D", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
                    <h2>היסטוריית הזמנות</h2>
                    {orderHistory.length === 0 ? (
                        <p>לא נמצאו הזמנות</p>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {orderHistory.map((order, idx) => (
                                <li key={`${order.id}-${idx}`} style={{ marginBottom: "8px" }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleDateClick(order)}
                                        style={{ minWidth: "180px" }}
                                    >
                                        {/* פורמט התאריך יכול להיות פשוט יותר עכשיו */}
                                        {new Date(order.date).toLocaleDateString('he-IL')}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>פרטי הזמנה</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <div>
                            <p><strong>תאריך:</strong> {new Date(selectedOrder.date).toLocaleDateString('he-IL')}</p>
                            <p><strong>מספר מנות:</strong> {selectedOrder.countOfDishes}</p>
                            <p><strong>שדרוג מנה:</strong> {selectedOrder.isUpgradedDish ? "כן" : "לא"}</p>
                            <p><strong>מספר מלצרים:</strong> {selectedOrder.numberOfWaiters}</p>
                            <p><strong>סוג אירוע:</strong> {selectedOrder.inMorning ? "בוקר" : "ערב"}</p>
                            <p><strong>שם לקוח:</strong> {selectedOrder.customer?.firstName?.trim()} {selectedOrder.customer?.lastName?.trim()}</p>
                            <p><strong>טלפון:</strong> {selectedOrder.customer?.phoneNum?.trim()}</p>
                            <p><strong>אימייל:</strong> {selectedOrder.customer?.email}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">סגור</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PersonalArea;