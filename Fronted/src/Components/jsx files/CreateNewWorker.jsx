import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Paper, Typography, MenuItem, Stack } from "@mui/material";
import { addNewWorker } from "../../Redux/thunk";
import '../css files/CreateNewWorker.css';

const gold = "#CDAA7D";
const white = "#fff";
const workerTypes = [
    "Manager",
    "Waiter",
    "Cook",
    "Cleaner",
    "Other"
];

const initialState = {
    id: "",
    name: "",
    age: "",
    workerType: "",
    salary: "",
    hoursAtWeek: "",
    bonus: "",
    seniority: "",
    email: ""
};

const CreateNewWorker = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        try {
            await dispatch(addNewWorker({
                Id: Number(form.id),
                Name: form.name,
                Age: Number(form.age),
                WorkerType: form.workerType,
                Salary: Number(form.salary),
                HoursAtWeek: Number(form.hoursAtWeek),
                Bonus: form.bonus,
                Seniority: Number(form.seniority),
                Email: form.email
            })).unwrap();
            setForm(initialState);
            setSuccess(true);
        } catch (err) {
            alert("Failed to add worker: " + err.message);
        }
    };

    return (
        <Box className="create-worker-main-container"> {/* Added className */}
            <Paper className="create-worker-paper"> {/* Added className */}
                <Typography variant="h4" className="create-worker-title"> {/* Added className */}
                    Add New Worker
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="ID"
                            name="id"
                            value={form.id}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            select
                            label="Worker Type"
                            name="workerType"
                            value={form.workerType}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        >
                            {workerTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Salary"
                            name="salary"
                            value={form.salary}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Hours At Week"
                            name="hoursAtWeek"
                            value={form.hoursAtWeek}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Bonus"
                            name="bonus"
                            value={form.bonus}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Seniority"
                            name="seniority"
                            value={form.seniority}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="email"
                            InputLabelProps={{ className: 'create-worker-label' }} // Replaced style
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className="create-worker-submit-button" // Replaced sx prop
                            fullWidth
                        >
                            Add Worker
                        </Button>
                        {success && (
                            <Typography className="create-worker-success-message"> {/* Added className */}
                                Worker added successfully!
                            </Typography>
                        )}
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateNewWorker;