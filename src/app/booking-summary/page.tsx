"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const BookingSummaryPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
        bgcolor="background.paper" // or try bgcolor="#fff"
        color="text.primary" // ensures text color is visible
        px={2}
      >
        <CheckCircleOutline sx={{ fontSize: 40, color: "green", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed
        </Typography>
        <Typography variant="body1">
          Thank you! Your booking has been successfully submitted. Check the email for booking summary.
        </Typography>
      </Box>
    </Container>
  );
};

export default BookingSummaryPage;
