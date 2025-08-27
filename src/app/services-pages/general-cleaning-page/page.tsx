"use client"
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { CheckCircle, Home, Bed, Bathtub, Kitchen, Phone, Star, Schedule, AttachMoney } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import "./style.css"

export default function GeneralCleaningPage() {
  const allAreasChecklist = [
    "Light tidy-up (up to 30 mins)",
    "Empty all bins",
    "Dust skirting boards, sills & doors (where reachable)",
    "Wipe light switches & power points",
    "Dust surfaces within reach",
    "Clean all mirrors",
    "Spray air freshener (on request)",
    "Vacuum & mop all accessible floors",
  ]

  const bedroomsLivingChecklist = [
    "Dust & wipe all reachable surfaces",
    "Make beds (on request)",
    "Vacuum/mop floors (under furniture if easy to move)",
  ]

  const bathroomsChecklist = [
    "Clean bath, shower, sink & toilet (inside & outside)",
    "Wipe vanities, cupboards & benchtops",
    "Clean mirrors",
    "Polish taps & chrome",
    "Empty bathroom bins",
    "Spot clean floor grout (visible areas only)",
  ]

  const kitchenChecklist = [
    "Clean stovetop & rangehood (outside only)",
    "Wipe benches & splashback",
    "Clean outside of microwave, kettle, etc.",
    "Wipe cupboard & drawer fronts",
    "Scrub sink & polish taps",
    "Empty visible rubbish",
  ]

  const features = [
    {
      icon: <Schedule />,
      title: "Flexible Scheduling",
      description: "Weekly, bi-weekly, or monthly cleaning",
    },
    {
      icon: <Star />,
      title: "Professional Team",
      description: "Trained and insured cleaners",
    },
    {
      icon: <AttachMoney />,
      title: "Affordable Rates",
      description: "Starting from $80 per session",
    },
  ]

  return (
    <div className="general-cleaning-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-image-container">
          <Image 
            src="/Images/general-cleaning-cover.jpg" 
            alt="Professional cleaning service" 
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        <Container maxWidth="lg">
          <Box className="hero-content" textAlign="center">
            <Typography variant="h1" className="hero-title">
              General House Cleaning
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Professional cleaning services that leave your home spotless and fresh
            </Typography>
            <Box className="hero-features">
              {features.map((feature, index) => (
                <Chip
                  key={index}
                  icon={feature.icon}
                  label={feature.title}
                  className="hero-chip"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
            <Link href="/booking" passHref>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<Phone />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '50px',
                  boxShadow: '0 4px 14px rgba(82, 179, 217, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(82, 179, 217, 0.6)',
                  },
                }}
              >
                Book Now
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container maxWidth="lg">
          <Box className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <CardContent>
                  <Box className="feature-icon">{feature.icon}</Box>
                  <Typography variant="h6" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section-general">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title-general">
              Pricing Guide
            </Typography>
            <Typography variant="h6" className="section-subtitle-general">
              Transparent pricing with no hidden fees - choose what works for your home
            </Typography>
          </Box>

          <Box className="pricing-content">
            {/* Base Pricing */}
            <Card className="pricing-card main-pricing">
              <CardContent>
                <Typography variant="h5" className="pricing-card-title">
                  General House Cleaning Rates
                </Typography>
                <Box className="pricing-grid">
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      1 Bedroom
                    </Typography>
                    <Typography variant="h4" className="price">
                      $135
                    </Typography>
                  </Box>
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      2 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $165
                    </Typography>
                  </Box>
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      3 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $195
                    </Typography>
                  </Box>
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      4 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $235
                    </Typography>
                  </Box>
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      5 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $285
                    </Typography>
                  </Box>
                  <Box className="pricing-item">
                    <Typography variant="h6" className="bedroom-count">
                      6 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $315
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Add-on Services */}
            <Card className="pricing-card addon-pricing">
              <CardContent>
                <Typography variant="h5" className="pricing-card-title">
                  Additional Services (Add-ons)
                </Typography>
                <Box className="addon-grid">
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Spring Clean
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $50-90
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Inside Oven
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $70
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Inside Fridge
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $30
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Kitchen Cabinets
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $30-45
                    </Typography>
                    <Typography variant="caption" className="addon-note">
                      (empty - full)
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Balcony
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $35
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Green Supplies
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $5
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Inside Windows
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $70-125
                    </Typography>
                    <Typography variant="caption" className="addon-note">
                      (1-3BR - 3+BR)
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Laundry
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $35/load
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Bed Changing
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $12/bed
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Ironing
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $40/30min
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Wall Cleaning
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $29/wall
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Steam Cleaning
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $40-55
                    </Typography>
                    <Typography variant="caption" className="addon-note">
                      (small-large room)
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Stairway Steam
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $25
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Dish Washing
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $39
                    </Typography>
                  </Box>
                  <Box className="addon-item">
                    <Typography variant="body1" className="addon-name">
                      Wet Wiping Blinds
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $29/blind
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box className="pricing-cta">
            <Typography variant="h6" className="pricing-cta-text">
              Need a custom quote for your specific needs?
            </Typography>
            <Link href="/booking" passHref>
              <Button variant="contained" className="cta-button primary">
                Get Free Quote
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Checklist Section */}
      <section className="checklist-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title-general">
              What&#39;s Included in Your Clean
            </Typography>
            <Typography variant="h6" className="section-subtitle-general">
              Our comprehensive cleaning checklist ensures every area of your home gets the attention it deserves
            </Typography>
          </Box>

          <Box className="checklist-grid">
            {/* All Areas */}
            <Card className="checklist-card">
              <CardContent>
                <Box className="checklist-header">
                  <Home className="checklist-icon" />
                  <Typography variant="h5" className="checklist-title">
                    All Areas
                  </Typography>
                </Box>
                <List className="checklist-list">
                  {allAreasChecklist.map((item, index) => (
                    <ListItem key={index} className="checklist-item">
                      <ListItemIcon>
                        <CheckCircle className="check-icon" />
                      </ListItemIcon>
                      <ListItemText primary={item} className="checklist-text" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Bedrooms & Living Areas */}
            <Card className="checklist-card">
              <CardContent>
                <Box className="checklist-header">
                  <Bed className="checklist-icon" />
                  <Typography variant="h5" className="checklist-title">
                    Bedrooms & Living Areas
                  </Typography>
                </Box>
                <List className="checklist-list">
                  {bedroomsLivingChecklist.map((item, index) => (
                    <ListItem key={index} className="checklist-item">
                      <ListItemIcon>
                        <CheckCircle className="check-icon" />
                      </ListItemIcon>
                      <ListItemText primary={item} className="checklist-text" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Bathrooms */}
            <Card className="checklist-card">
              <CardContent>
                <Box className="checklist-header">
                  <Bathtub className="checklist-icon" />
                  <Typography variant="h5" className="checklist-title">
                    Bathrooms
                  </Typography>
                </Box>
                <List className="checklist-list">
                  {bathroomsChecklist.map((item, index) => (
                    <ListItem key={index} className="checklist-item">
                      <ListItemIcon>
                        <CheckCircle className="check-icon" />
                      </ListItemIcon>
                      <ListItemText primary={item} className="checklist-text" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Kitchen */}
            <Card className="checklist-card">
              <CardContent>
                <Box className="checklist-header">
                  <Kitchen className="checklist-icon" />
                  <Typography variant="h5" className="checklist-title">
                    Kitchen
                  </Typography>
                </Box>
                <List className="checklist-list">
                  {kitchenChecklist.map((item, index) => (
                    <ListItem key={index} className="checklist-item">
                      <ListItemIcon>
                        <CheckCircle className="check-icon" />
                      </ListItemIcon>
                      <ListItemText primary={item} className="checklist-text" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <Container maxWidth="lg">
          <Box className="cta-content">
            <Typography variant="h3" className="cta-title">
              Ready for a Spotless Home?
            </Typography>
            <Typography variant="h6" className="cta-subtitle">
              Book your regular house cleaning service today and enjoy more free time
            </Typography>
            <Box className="cta-actions">
              <Link href="/booking" passHref>
                <Button variant="contained" size="large" className="cta-button primary large">
                  Book General Cleaning Now
                </Button>
              </Link>
              <Box className="contact-info">
                <Typography variant="body1" className="contact-text">
                  Questions? Call us:
                </Typography>
                <Typography variant="h5" className="contact-phone">
                  <a href="tel:+61468300130" style={{ color: 'inherit', textDecoration: 'none' }}>
                    0468 300 130
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </section>
    </div>
  )
}
