import { Box, Typography, Button, Container, Chip } from "@mui/material";
import { CheckCircle, Security, Star } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import "./HeroSection.css";
import "../../../Styles/Button/Button.css";

export default function HeroSection() {
  return (
    <section className="hero-section-home">
      <Container maxWidth="lg">
        <Box className="hero-content-home">
          <Typography variant="h1" className="hero-title-home">
            Melbourne&rsquo;s Premier
            <span className="highlight"> Cleaning Service</span>
          </Typography>
          <Typography variant="h5" className="hero-subtitle-home">
            Professional, reliable, and eco-friendly cleaning services for your
            home and office
          </Typography>
          <Box className="hero-features">
            <Chip
              icon={<CheckCircle />}
              label="100% Satisfaction Guaranteed"
              className="hero-chip-home"
            />
            <Chip
              icon={<Security />}
              label="Fully Insured & Bonded"
              className="hero-chip-home"
            />
            <Chip
              icon={<Star />}
              label="5-Star Rated Service"
              className="hero-chip-home"
            />

          </Box>
          <Box className="hero-actions-home">
            <Button
              component={Link}
              href="/booking"
              variant="contained"
              className="stl-button-home primary"  
              size="large"
            >
              Book Now - Get Quote
            </Button>
            <Button
              component="a"
              href="https://wa.me/61468300130?text=Hi%2C%20I%E2%80%99d%20like%20to%20make%20a%20booking%21"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              className="stl-button secondary"
              startIcon={<PhoneIcon />}
            >
              0468 300 130
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
