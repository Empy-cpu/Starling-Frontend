"use client"
import { Box, Typography, Container, IconButton, Divider } from "@mui/material"
import Link from "next/link"
import { Facebook, Instagram, LinkedIn, Phone, Email, LocationOn } from "@mui/icons-material"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <Box className="footer-main">
            <Box className="footer-brand">
              <Typography variant="h5" className="footer-logo">
                Starling Cleaners
              </Typography>
              <Typography variant="body2" className="footer-tagline">
                Melbourne&lsquo;s Premier Cleaning Service
              </Typography>
              <Box className="social-links">
                <IconButton component="a" href="#" className="social-icon facebook" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton component="a" href="#" className="social-icon instagram" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton component="a" href="#" className="social-icon linkedin" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>

            <Box className="footer-contact" suppressHydrationWarning>
              <Typography variant="h6" className="footer-section-title">
                Contact Us
              </Typography>
              <Box className="contact-item">
                <Phone className="contact-icon" />
                <Typography variant="body2" component="a" href="https://wa.me/61390883118" className="footer-link">03 9088 3118</Typography>
              </Box>
              <Box className="contact-item">
                <Email className="contact-icon" />
                <Typography variant="body2" component="a" href="mailto:info@cleanify.com.au" className="footer-link">info@cleanify.com.au</Typography>
              </Box>
              <Box className="contact-item">
                <LocationOn className="contact-icon" />
                <Typography variant="body2" className="footer-link">Melbourne, Victoria</Typography>
              </Box>
            </Box>

            <Box className="footer-services" suppressHydrationWarning>
              <Typography variant="h6" className="footer-section-title">
                Our Services
              </Typography>
              <Link href="/services-pages/general-cleaning-page" passHref>
                <Typography variant="body2" className="footer-link">
                  General House Cleaning
                </Typography>
              </Link>
              <Link href="/services-pages/end-of-lease-cleaning-page" passHref>
                <Typography variant="body2" className="footer-link">
                  End of Lease Cleaning
                </Typography>
              </Link>
             
            </Box>

            <Box className="footer-company" suppressHydrationWarning>
              <Typography variant="h6" className="footer-section-title">
                Company
              </Typography>
              <Link href="/#about-us" passHref>
                <Typography variant="body2" className="footer-link">
                  About Us
                </Typography>
              </Link>
              <Link href="/#reviews" passHref>
                <Typography variant="body2" className="footer-link">
                  Reviews
                </Typography>
              </Link>
              <Link href="/#careers" passHref>
                <Typography variant="body2" className="footer-link">
                  Careers
                </Typography>
              </Link>
              <Link href="/#contact" passHref>
                <Typography variant="body2" className="footer-link">
                  Contact
                </Typography>
              </Link>
            </Box>
          </Box>

          <Divider className="footer-divider" />

          <Box className="footer-bottom" suppressHydrationWarning>
            <Typography variant="body2" className="footer-copyright">
              © 2024 Starling Cleaners. All rights reserved.
            </Typography>
            <Box className="footer-legal">
              <Link href="#" passHref>
                <Typography variant="body2" className="footer-link">
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="#" passHref>
                <Typography variant="body2" className="footer-link">
                  Terms of Service
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  )
}
