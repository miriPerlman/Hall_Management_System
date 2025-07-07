import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Paper, Typography, MenuItem, Stack } from "@mui/material";
import { addNewWorker } from "../Redux/thunk";

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
        <Box sx={{
            marginTop: 20,
            minHeight: "100vh",
            background: "#f7f5f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Paper sx={{
                p: 5,
                borderRadius: 4,
                boxShadow: `0 8px 32px 0 ${gold}33`,
                background: white,
                minWidth: 400,
                maxWidth: 500
            }}>
                <Typography variant="h4" sx={{
                    color: gold,
                    fontWeight: 800,
                    mb: 3,
                    textAlign: "center",
                    letterSpacing: 1
                }}>
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
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            select
                            label="Worker Type"
                            name="workerType"
                            value={form.workerType}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ style: { color: gold } }}
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
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Hours At Week"
                            name="hoursAtWeek"
                            value={form.hoursAtWeek}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Bonus"
                            name="bonus"
                            value={form.bonus}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Seniority"
                            name="seniority"
                            value={form.seniority}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="number"
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            type="email"
                            InputLabelProps={{ style: { color: gold } }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                background: gold,
                                color: "#222",
                                fontWeight: 700,
                                letterSpacing: 1,
                                borderRadius: 2,
                                mt: 2,
                                '&:hover': { background: "#b89a6b", color: white }
                            }}
                            fullWidth
                        >
                            Add Worker
                        </Button>
                        {success && (
                            <Typography sx={{ color: "green", textAlign: "center", mt: 1 }}>
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