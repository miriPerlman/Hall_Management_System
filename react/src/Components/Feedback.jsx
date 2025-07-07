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

const Feedback = ({ feedbacks = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 1 }}>
        משובי לקוחות
      </Typography>
      <Typography align="center" sx={{ mb: 3 }}>
        מה הלקוחות שלנו מספרים עלינו?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {visibleFeedbacks.map((fb, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: 320,
              maxWidth: 370,
              background: "#fff",
              color: "#222",
              boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.10)",
              borderRadius: 4,
              display: "flex",
              alignItems: "flex-start",
              p: 3,
              direction: "rtl",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-6px) scale(1.03)",
                boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.18)",
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                width: 64,
                height: 64,
                mr: 3,
                boxShadow: 2,
                border: "3px solid #e3eafc",
              }}
              src={fb.avatar}
            >
              <PersonIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <CardContent sx={{ flex: 1, p: 0 }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  borderBottom: "2px solid #e3eafc",
                  pb: 1,
                  mb: 1.5,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {fb.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: "1.08rem",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                {fb.comment}
              </Typography>
              <Box
                sx={{
                  background: "#f5f8ff",
                  borderRadius: 2,
                  py: 1,
                  px: 2,
                  display: "inline-block",
                  mt: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating value={fb.rating} readOnly />
                  <Typography variant="body2" color="text.secondary">
                   
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      {!showAll && feedbacks.length > 3 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setShowAll(true)}
            sx={{
              background: "#1976d2",
              color: "#fff",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontSize: "1.1rem",
              borderRadius: 3,
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
              "&:hover": {
                background: "#115293",
              },
            }}
          >
            לצפיה בכל המשובים
          </Button>
        </Box>
      )}
    </>
  );
};

export default Feedback;