import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteWorkerById, getAllWorkers } from "../Redux/thunk";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Collapse, Paper, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
        <Box
            sx={{
                minHeight: "100vh",
                background: "#f7f5f2",
                py: 0,
                px: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 60
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 1050,
                    mt: 8,
                    background: white,
                    borderRadius: 5,
                    p: 5,
                    boxShadow: `0 8px 32px 0 ${gold}33`,
                    minHeight: 400,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: gold,
                        fontWeight: 900,
                        mb: 4,
                        letterSpacing: 2,
                        textAlign: "center",
                        fontFamily: 'Varela Round, Alef, Arial, sans-serif',
                        fontSize: "2.3rem"
                    }}
                >
                    All Workers
                </Typography>
                <List>
                    {allWorkers.map((worker, idx) => (
                        <Box key={worker.id}>
                            <ListItem
                                sx={{
                                    background: idx % 2 === 0 ? white : "#f9f6f1",
                                    borderRadius: 3,
                                    mb: 2,
                                    boxShadow: "0 2px 8px #CDAA7D11",
                                    transition: "background 0.2s",
                                    '&:hover': { background: "#fffbe9" },
                                    px: 3,
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDelete(worker.id)}
                                        sx={{
                                            color: black,
                                            background: gold,
                                            ml: 2,
                                            '&:hover': { background: black, color: gold }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            onClick={() => handleToggle(idx)}
                                            sx={{
                                                color: black,
                                                fontWeight: 700,
                                                fontSize: "1.3rem",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                userSelect: "none",
                                                fontFamily: 'Varela Round, Alef, Arial, sans-serif',
                                            }}
                                        >
                                            {worker.name}
                                            {openIndex === idx ? (
                                                <ExpandLessIcon sx={{ ml: 1, color: gold }} />
                                            ) : (
                                                <ExpandMoreIcon sx={{ ml: 1, color: gold }} />
                                            )}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Collapse in={openIndex === idx} timeout="auto" unmountOnExit>
                                <Box
                                    sx={{
                                        background: "#f6f2ea",
                                        borderRadius: 2,
                                        p: 3,
                                        mx: 4,
                                        mb: 2,
                                        border: `1px solid ${gold}44`,
                                        boxShadow: "0 2px 8px #CDAA7D22"
                                    }}
                                >
                                    <Typography sx={{ color: gold, fontWeight: 700, mb: 1 }}>Details:</Typography>
                                    <Typography sx={{ color: black, fontSize: "1.08rem" }}>
                                        <b>ID:</b> {worker.id}<br />
                                        <b>Email:</b> {String(worker.email) || "null"}<br />
                                        <b>Seniority:</b> {worker.seniority || "null"}<br />
                                        <b>Type:</b> {String(worker.workerType) || "null"}
                                    </Typography>
                                </Box>
                            </Collapse>
                            {idx < allWorkers.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default AllWorkers;