"use client";
import { Box, Typography, Button, Container } from "@mui/material";
import { CalendarMonth, EmojiPeople, Done } from "@mui/icons-material";
import "./HowItWorksSection.css";
import Link from "next/link";

export default function HowItWorksSection() {
  const howItWorks = [
    {
      step: 1,
      title: "Book Online",
      description:
        "Choose your service and preferred time slot in just a few clicks",
      icon: <CalendarMonth />,
    },
    {
      step: 2,
      title: "We Come to You",
      description:
        "Our professional cleaners arrive on time with all equipment",
      icon: <EmojiPeople />,
    },
    {
      step: 3,
      title: "Enjoy Clean Space",
      description: "Relax and enjoy your spotlessly clean home or office",
      icon: <Done />,
    },
  ];

  return (
    <section className="how-it-works-section">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-how" >
            How to Book
          </Typography>
          <Typography variant="h6" className="section-subtitle-how">
            Getting your space cleaned is as easy as 1-2-3
          </Typography>
        </Box>
        <Box className="steps-container">
          {howItWorks.map((step, index) => (
            <Box key={index} className="step-item">
              <Box className="step-number">{step.step}</Box>
              <Box className="step-icon">{step.icon}</Box>
              <Typography variant="h5" className="step-title">
                {step.title}
              </Typography>
              <Typography variant="body1" className="step-description">
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className="cta-container">
          <Button
            component={Link}
            href="/booking"
            variant="contained"
            size="large"
            className="stl-button-home primary"
          >
            Start Your Booking
          </Button>
        </Box>
      </Container>
    </section>
  );
}
