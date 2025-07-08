import React, { useState } from "react";
import { Box, TextField, Button, Typography, Rating, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import '../css files/CreateFeedback.css'; 

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
      className="create-feedback-container" // Replaced sx prop
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
          className="create-feedback-textfield" // Replaced sx prop
        />
        <TextField
          label="משוב"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          required
          multiline
          rows={3}
          className="create-feedback-textfield" // Replaced sx prop
        />
        <Box className="create-feedback-rating-box"> {/* Replaced sx prop */}
          <Typography className="create-feedback-rating-label">דירוג:</Typography> {/* Replaced sx prop */}
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
          className="create-feedback-submit-button" // Replaced sx prop
        >
          שלח משוב
        </Button>
      </form>
    </Box>
  );
};

export default CreateFeedback;