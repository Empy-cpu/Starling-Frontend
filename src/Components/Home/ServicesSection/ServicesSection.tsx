"use client";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { CleaningServices, Security } from "@mui/icons-material";
import "./ServicesSection.css";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "General House Cleaning",
      description: "Regular cleaning to keep your home spotless and fresh",
      icon: <CleaningServices />,
      price: "From $135",
      link: "/services-pages/general-cleaning-page",
    },
    {
      title: "End of Lease Cleaning",
      description: "Comprehensive cleaning to get your bond back guaranteed",
      icon: <Security />,
      price: "From $335",
      link: "/services-pages/end-of-lease-cleaning-page",
    },
  ];

  return (
    <section className="services-section" id="services">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-home-services">
            Our Services
          </Typography>
          <Typography variant="h6" className="section-subtitle-services">
            Professional cleaning solutions tailored to your needs
          </Typography>
        </Box>
        <Box className="services-grid">
          {services.map((service, index) => (
            <Card key={index} className="service-card">
              <CardContent>
                <Box className="service-icon">{service.icon}</Box>
                <Typography variant="h5" className="service-title">
                  {service.title}
                </Typography>
                <Typography variant="body1" className="service-description">
                  {service.description}
                </Typography>
                <Typography variant="h6" className="service-price">
                  {service.price}
                </Typography>
                <Button
                  variant="outlined"
                  className="service-button"
                  component={Link}
                  href={service.link}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </section>
  );
}
