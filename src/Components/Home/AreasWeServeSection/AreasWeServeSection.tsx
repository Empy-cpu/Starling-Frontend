"use client"
import { Box, Typography, Container, Chip } from "@mui/material"
import { LocationOn } from "@mui/icons-material"
import "./AreasWeServeSection.css"

export default function AreasSection() {
  const areas = [
    "Melbourne CBD",
    "South Yarra",
    "Richmond",
    "Toorak",
    "Prahran",
    "St Kilda",
    "Fitzroy",
    "Carlton",
    "Docklands",
    "Southbank",
    "Port Melbourne",
    "Albert Park",
  ]

  return (
    <section className="areas-section" id="areas">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title">
            Areas We Serve
          </Typography>
          <Typography variant="h6" className="section-subtitle">
            Professional cleaning services across Melbourne
          </Typography>
        </Box>
        <Box className="areas-grid">
          {areas.map((area, index) => (
            <Chip key={index} icon={<LocationOn />} label={area} className="area-chip" variant="outlined" />
          ))}
        </Box>
        <Box className="areas-cta">
          <Typography variant="body1" className="areas-cta-text">
            Don&#39;t see your area? <strong>Contact us</strong> - we may still be able to help!
          </Typography>
        </Box>
      </Container>
    </section>
  )
}
