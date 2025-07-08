import React, { useState } from "react";
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
import '../css files/Feedback.css'; // New import

const Feedback = ({ feedbacks = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <>
      <Typography variant="h4" align="center" className="feedback-title"> {/* Added className */}
        משובי לקוחות
      </Typography>
      <Typography align="center" className="feedback-subtitle"> {/* Added className */}
        מה הלקוחות שלנו מספרים עלינו?
      </Typography>
      <Box className="feedback-cards-container"> {/* Added className */}
        {visibleFeedbacks.map((fb, idx) => (
          <Card
            key={idx}
            className="feedback-card" // Added className
          >
            <Avatar className="feedback-avatar" src={fb.avatar}> {/* Added className */}
              <PersonIcon className="feedback-person-icon" /> {/* Added className */}
            </Avatar>
            <CardContent className="feedback-card-content"> {/* Added className */}
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="feedback-card-name" // Added className
              >
                {fb.name}
              </Typography>
              <Typography
                variant="body1"
                className="feedback-card-comment" // Added className
              >
                {fb.comment}
              </Typography>
              <Box className="feedback-rating-box"> {/* Added className */}
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
        <Box className="feedback-show-all-button-container"> {/* Added className */}
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setShowAll(true)}
            className="feedback-show-all-button" // Added className
          >
            לצפיה בכל המשובים
          </Button>
        </Box>
      )}
    </>
  );
};

export default Feedback;