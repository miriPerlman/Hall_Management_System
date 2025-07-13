import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import '../css files/Feedback.css'; 

const Feedback = ({ feedbacks = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <>
      <Typography variant="h4" align="center" className="feedback-title">
       Customer feedback
      </Typography>
      <Typography align="center" className="feedback-subtitle"> 
        What do our customers say about us?
      </Typography>
      <Box className="feedback-cards-container">
        {visibleFeedbacks.map((fb, idx) => (
          <Card
            key={idx}
            className="feedback-card" 
          >
            <Avatar className="feedback-avatar" src={fb.avatar}> 
              <PersonIcon className="feedback-person-icon" />
            </Avatar>
            <CardContent className="feedback-card-content"> 
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="feedback-card-name" 
              >
                {fb.name}
              </Typography>
              <Typography
                variant="body1"
                className="feedback-card-comment" 
              >
                {fb.comment}
              </Typography>
              <Box className="feedback-rating-box">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating value={fb.rating} readOnly />
                  <Typography variant="body2" color="text.secondary"></Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      {!showAll && feedbacks.length > 3 && (
        <Box className="feedback-show-all-button-container"> 
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setShowAll(true)}
            className="feedback-show-all-button" 
          >
            View all responses
          </Button>
        </Box>
      )}
    </>
  );
};

export default Feedback;