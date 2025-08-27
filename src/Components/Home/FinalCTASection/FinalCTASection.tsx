"use client"
import { Box, Typography, Button, Container } from "@mui/material"
import Link from "next/link"
import "./FinalCTASection.css"

export default function FinalCTASection() {
  return (
    <section className="final-cta-section">
      <Container maxWidth="lg">
        <Box className="final-cta-content">
          <Typography variant="h3" className="final-cta-title">
            Ready for a Spotless Space?
          </Typography>
          <Typography variant="h6" className="final-cta-subtitle">
            Join thousands of satisfied customers across Melbourne
          </Typography>
          <Box className="final-cta-actions">
            <Link href="/booking" passHref>
              <Button variant="contained" size="large" className="cta-button primary large">
                Get Your Quote
              </Button>
            </Link>
            <Box className="contact-info">
              <Typography variant="body1" className="contact-text-home">
                Or call us directly:
              </Typography>
              <Typography variant="h5" className="contact-phone-home">
                0468 300 130
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
