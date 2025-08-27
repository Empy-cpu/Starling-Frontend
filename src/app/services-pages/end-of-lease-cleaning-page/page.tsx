"use client";
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
} from "@mui/material";
import {
  CheckCircle,
  Home,
  Bed,
  Bathtub,
  Kitchen,
  Phone,
  Star,
  Security,
  AttachMoney,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

export default function EndOfLeaseCleaningPage() {
  const allAreasChecklist = [
    "Tidy up rooms and remove cobwebs",
    "Empty all bins",
    "Dust and wipe skirting boards, window sills, doors, and reachable surfaces",
    "Clean light switches and power points",
    "Clean mirrors and soft furnishings",
    "Lightly dust blinds",
    "Vacuum or wipe window tracks and sills",
    "Clean inside all drawers and cupboards",
  ];

  const floorsChecklist = ["Vacuum and mop all accessible floors"];

  const bathroomsChecklist = [
    "Clean bath, shower, sinks, and benches",
    "Clean mirrors, tapware, and cupboards",
    "Scrub tiles and grout",
    "Clean toilet and exhaust fan",
    "Empty bins and clean inside all drawers and cabinets",
  ];

  const kitchenChecklist = [
    "Clean stovetop, range hood, and exhaust fans",
    "Wipe benches, splashback, and sink",
    "Clean tapware and polish steel surfaces",
    "Clean inside oven, dishwasher, drawers, and cupboards",
    "Dust all kitchen surfaces",
  ];

  const bedroomsLivingChecklist = [
    "Dust and wipe all surfaces",
    "Clean inside all drawers and cabinets",
  ];

  const features = [
    {
      icon: <Security />,
      title: "Bond Back Guarantee",
      description: "Get your full bond back or we'll re-clean for free",
    },
    {
      icon: <Star />,
      title: "Deep Clean Specialists",
      description: "Thorough cleaning that meets inspection standards",
    },
    {
      icon: <AttachMoney />,
      title: "Competitive Pricing",
      description: "Starting from $420 for comprehensive cleaning",
    },
  ];

  return (
    <div className="end-lease-cleaning-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-image-container">
          <Image
            src="/Images/end_of_lease_cover.jpg"
            alt="Professional end of lease cleaning service"
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.9) contrast(1.05)",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
        <Container maxWidth="lg">
          <Box className="hero-content" textAlign="center">
            <Typography variant="h1" className="hero-title">
              End of Lease Cleaning
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Comprehensive cleaning to get your bond back - guaranteed
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
            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}
            >
              <Link href="/booking" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Phone />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "50px",
                    boxShadow: "0 4px 14px rgba(82, 179, 217, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(82, 179, 217, 0.6)",
                    },
                  }}
                >
                  Book Now 
                </Button>
              </Link>
            </Box>
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
      <section className="pricing-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title-end">
              End of Lease Cleaning Pricing
            </Typography>
            <Typography variant="h6" className="section-subtitle-end">
              Comprehensive cleaning packages designed to get your bond back
            </Typography>
          </Box>

          <Box className="pricing-content">
            {/* Base Pricing */}
            <Card className="pricing-card main-pricing">
              <CardContent>
                <Typography variant="h5" className="pricing-card-title">
                  End of Lease Cleaning Rates
                </Typography>
                <Typography variant="body1" className="pricing-description">
                  Our end of lease cleaning includes everything in our general
                  cleaning plus deep cleaning of all areas to meet inspection
                  standards. Prices vary based on furniture presence.
                </Typography>
                <Box className="pricing-grid">
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      1 Bedroom
                    </Typography>
                    <Typography variant="h4" className="price">
                      $335
                    </Typography>
                  </Box>
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      2 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $415
                    </Typography>
                  </Box>
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      3 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $495
                    </Typography>
                  </Box>
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      4 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $595
                    </Typography>
                  </Box>
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      5 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $675
                    </Typography>
                  </Box>
                  <Box className="pricing-item featured">
                    <Typography variant="h6" className="bedroom-count">
                      6 Bedrooms
                    </Typography>
                    <Typography variant="h4" className="price">
                      $725
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
                <Typography variant="body2" className="addon-description">
                  Enhance your end of lease cleaning with these optional extras
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
                      Balcony
                    </Typography>
                    <Typography variant="h6" className="addon-price">
                      $35
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

          <Box className="pricing-guarantee">
            <Card className="guarantee-pricing-card">
              <CardContent>
                <Security className="guarantee-pricing-icon" />
                <Typography variant="h5" className="guarantee-pricing-title">
                  100% Bond Back Guarantee
                </Typography>
                <Typography variant="body1" className="guarantee-pricing-text">
                  If you don&#39;t get your full bond back due to cleaning
                  issues, we&rsquo;ll return within 72 hours to re-clean any
                  areas of concern at no additional cost.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box className="pricing-cta">
            <Typography variant="h6" className="pricing-cta-text">
              Ready to secure your bond return?
            </Typography>
            <Link href="/booking" passHref>
              <Button variant="contained" className="cta-button primary">
                Book End of Lease Cleaning
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Checklist Section */}
      <section className="checklist-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title-end">
              Complete End of Lease Cleaning Checklist
            </Typography>
            <Typography variant="h6" className="section-subtitle-end">
              Our thorough cleaning process covers every area to ensure you get
              your bond back
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
            {/* Floors */}
            <Card className="checklist-card">
              <CardContent>
                <Box className="checklist-header">
                  <Home className="checklist-icon" />
                  <Typography variant="h5" className="checklist-title">
                    Floors
                  </Typography>
                </Box>
                <List className="checklist-list">
                  {floorsChecklist.map((item, index) => (
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

      {/* Bond Back Guarantee Section */}
      <section className="guarantee-section">
        <Container maxWidth="lg">
          <Card className="guarantee-card">
            <CardContent>
              <Box className="guarantee-content">
                <Security className="guarantee-icon" />
                <Typography variant="h4" className="guarantee-title">
                  100% Bond Back Guarantee
                </Typography>
                <Typography variant="body1" className="guarantee-description-li">
                  We&rsquo;re so confident in our end of lease cleaning service
                  that we guarantee you&rsquo;ll get your full bond back. If
                  your property manager or landlord isn&rsquo;t satisfied with
                  our cleaning, we&rsquo;ll return within 72 hours to re-clean
                  any areas of concern at no additional cost.
                </Typography>
                <Box className="guarantee-features">
                  <Chip
                    icon={<CheckCircle />}
                    label="Professional Grade Equipment"
                    className="guarantee-chip"
                  />
                  <Chip
                    icon={<CheckCircle />}
                    label="Experienced Cleaners"
                    className="guarantee-chip"
                  />
                  <Chip
                    icon={<CheckCircle />}
                    label="Detailed Checklist"
                    className="guarantee-chip"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <Container maxWidth="lg">
          <Box className="cta-content">
            <Typography variant="h3" className="cta-title">
              Get Your Bond Back Guaranteed
            </Typography>
            <Typography variant="h6" className="cta-subtitle">
              Book your end of lease cleaning today and move out stress-free
            </Typography>
            <Box className="cta-actions">
              <Link href="/booking" passHref>
                <Button
                  variant="contained"
                  size="large"
                  className="cta-button primary large"
                >
                  Book End of Lease Cleaning
                </Button>
              </Link>
              <Box className="contact-info">
                <Typography variant="body1" className="contact-text">
                  Need a quote? Call us:
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
  );
}
