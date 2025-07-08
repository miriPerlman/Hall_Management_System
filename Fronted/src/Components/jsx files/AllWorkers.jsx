import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteWorkerById, getAllWorkers } from "../../Redux/thunk";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Collapse, Paper, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../css files/AllWorkers.css'; 

const gold = "#CDAA7D";
const white = "#fff";
const black = "#222";

const AllWorkers = () => {
    const dispatch = useDispatch();
    const allWorkers = useSelector(state => state.workers.workersList);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        dispatch(getAllWorkers());
    }, [dispatch]);

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    const handleDelete = (workerId) => {
        dispatch(deleteWorkerById(workerId));
        alert(`Delete worker with id: ${workerId}`);
    };

    return (
        <Box className="all-workers-main-container"> {/* Added className */}
            <Paper
                elevation={4}
                className="all-workers-paper" // Added className
            >
                <Typography
                    variant="h3"
                    className="all-workers-title" // Added className
                >
                    All Workers
                </Typography>
                <List>
                    {allWorkers.map((worker, idx) => (
                        <Box key={worker.id}>
                            <ListItem
                                className={`all-workers-list-item ${idx % 2 === 0 ? 'even' : 'odd'}`} // Added className
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDelete(worker.id)}
                                        className="all-workers-delete-button" // Added className
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            onClick={() => handleToggle(idx)}
                                            className="all-workers-item-name" // Added className
                                        >
                                            {worker.name}
                                            {openIndex === idx ? (
                                                <ExpandLessIcon className="all-workers-expand-icon" />
                                            ) : (
                                                <ExpandMoreIcon className="all-workers-expand-icon" />
                                            )}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Collapse in={openIndex === idx} timeout="auto" unmountOnExit>
                                <Box className="all-workers-details-box"> {/* Added className */}
                                    <Typography className="all-workers-details-title">Details:</Typography> {/* Added className */}
                                    <Typography className="all-workers-details-text"> {/* Added className */}
                                        <b>ID:</b> {worker.id}<br />
                                        <b>Email:</b> {String(worker.email) || "null"}<br />
                                        <b>Seniority:</b> {worker.seniority || "null"}<br />
                                        <b>Type:</b> {String(worker.workerType) || "null"}
                                    </Typography>
                                </Box>
                            </Collapse>
                            {idx < allWorkers.length - 1 && <Divider className="all-workers-divider" />} {/* Added className */}
                        </Box>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default AllWorkers;