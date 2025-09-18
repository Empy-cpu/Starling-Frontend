"use client";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  QuestionAnswer,
} from "@mui/icons-material";

import "./ContactUsSection.css";

export default function ContactSection() {
  const contactInfo = [
    {
      title: "Phone",
      value: "0468 300 130",
      description: "Call us for immediate assistance",
      icon: <Phone />,
      action: "tel:+61468300130",
    },
    {
      title: "Email",
      value: "peer@starlingcleaners.com",
      description: "Send us your questions anytime",
      icon: <Email />,
      action: "mailto:peer@starlingcleaners.com.au",
    },
    {
      title: "Service Areas",
      value: "Melbourne & Suburbs",
      description: "We serve all major Melbourne areas",
      icon: <LocationOn />,
      action: null,
    },
    {
      title: "Business Hours",
      value: "Mon-Sat: 7AM-7PM",
      description: "Sunday: 8AM-5PM",
      icon: <Schedule />,
      action: null,
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="section-header" textAlign="center" mb={6}>
          <Typography variant="h2" className="section-title-contact">
            Get In Touch
          </Typography>
          <Typography variant="h6" className="section-subtitle-contact">
            Ready to book or have questions? We&#39;re here to help you get the perfect cleaning service
          </Typography>
        </Box>

        {/* Contact Info Cards */}
        <Box className="contact-info-grid">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="contact-info-card"
              onClick={info.action ? () => window.open(info.action, "_self") : undefined}
              sx={{ cursor: info.action ? "pointer" : "default" }}
            >
              <CardContent>
                <Box className="contact-info-icon">{info.icon}</Box>
                <Typography variant="h6" className="contact-info-title">
                  {info.title}
                </Typography>
                <Typography variant="h6" className="contact-info-value">
                  {info.value}
                </Typography>
                <Typography variant="body2" className="contact-info-description">
                  {info.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Quick Actions */}
        <Box className="quick-actions-wrapper">
          <Box className="quick-actions">
            <Card className="quick-action-card urgent">
              <CardContent>
                <Box className="quick-action-icon">
                  <Phone />
                </Box>
                <Typography variant="h6" className="quick-action-title">
                  Need Immediate Help?
                </Typography>
                <Typography variant="body2" className="quick-action-description">
                  Call us now for urgent cleaning needs or same-day service
                </Typography>
                <Button
                  variant="contained"
                  className="quick-action-button urgent-button"
                  href="tel:610468300130"
                >
                  Call Now: 0468 300 130 
                </Button>
              </CardContent>
            </Card>

            <Card className="quick-action-card">
              <CardContent>
                <Box className="quick-action-icon">
                  <QuestionAnswer />
                </Box>
                <Typography variant="h6" className="quick-action-title">
                  Frequently Asked Questions
                </Typography>
                <Typography variant="body2" className="quick-action-description">
                  Find quick answers to common questions about our services
                </Typography>
                <Button variant="outlined" className="quick-action-button">
                  View FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="quick-action-card">
              <CardContent>
                <Box className="quick-action-icon">
                  <Email />
                </Box>
                <Typography variant="h6" className="quick-action-title">
                  Email Support
                </Typography>
                <Typography variant="body2" className="quick-action-description">
                  Send us an email and we&#39;ll respond within 24 hours
                </Typography>
                <Button
                  variant="outlined"
                  className="quick-action-button"
                  href="mailto:info@cleanify.com.au"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Emergency Contact Banner */}
        <Box className="emergency-contact">
          <Typography variant="h5" className="emergency-title">
            Emergency Cleaning Services Available
          </Typography>
          <Typography variant="body1" className="emergency-description">
            Need urgent cleaning? We offer same-day and emergency cleaning services for unexpected situations.
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="emergency-button"
            href="tel:610468300130"
          >
            Call Emergency Line: 0468 300 130 
          </Button>
        </Box>
      </Container>
    </section>
  );
}
