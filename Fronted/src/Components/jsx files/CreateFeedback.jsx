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
      className="create-feedback-container" 
    >
      <Typography variant="h5" align="center" gutterBottom>
        יצירת משוב חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          className="create-feedback-textfield"
        />
        <TextField
          label="feedback"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          required
          multiline
          rows={3}
          className="create-feedback-textfield" 
        />
        <Box className="create-feedback-rating-box">
          <Typography className="create-feedback-rating-label">דירוג:</Typography>
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
          className="create-feedback-submit-button" 
        >
          Send feedback
        </Button>
      </form>
    </Box>
  );
};

export default CreateFeedback;