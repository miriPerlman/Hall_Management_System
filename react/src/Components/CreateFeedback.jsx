import React, { useState } from "react";
import { Box, TextField, Button, Typography, Rating, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CreateFeedback = ({addFeedback}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback({ name, comment, rating, avatar: "" });
    navigate ("/Feedback");
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
        background: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        יצירת משוב חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="משוב"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          required
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ mr: 1 }}>דירוג:</Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: "#1976d2",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.1rem",
            borderRadius: 2,
            py: 1.2,
            mt: 1,
            "&:hover": { background: "#115293" },
          }}
        >
          שלח משוב
        </Button>
      </form>
    </Box>
  );
};

export default CreateFeedback;