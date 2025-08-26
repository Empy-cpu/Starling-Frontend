"use client"
import { Box, Typography, Container, Card, CardContent } from "@mui/material"
import { CheckCircle, Security, CleaningServices, Schedule } from "@mui/icons-material"
import "./WhyChooseUsSection.css"

export default function WhyChooseUsSection() {
  const whyChooseUs = [
    {
      title: "100% Satisfaction Guarantee",
      description: "Not happy? We'll come back and re-clean for free",
      icon: <CheckCircle />,
    },
    {
      title: "Fully Insured & Bonded",
      description: "Complete peace of mind with comprehensive insurance coverage",
      icon: <Security />,
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe, non-toxic cleaning products for your family and pets",
      icon: <CleaningServices />,
    },
    {
      title: "Flexible Scheduling",
      description: "Book weekly, bi-weekly, monthly, or one-time cleaning",
      icon: <Schedule />,
    },
  ]

  return (
    <section id="about-us" className="why-choose-section">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-why">
            Why Choose Starling Cleaners?
          </Typography>
          <Typography variant="h6" className="section-subtitle-why">
            We&rsquo;re committed to delivering exceptional cleaning services
          </Typography>
        </Box>
        <Box className="features-grid-why">
          {whyChooseUs.map((feature, index) => (
            <Card key={index} className="feature-card-why">
              <CardContent>
                <Box className="feature-icon-why">{feature.icon}</Box>
                <Typography variant="h6" className="feature-title-why">
                  {feature.title}
                </Typography>
                <Typography variant="body2" className="feature-description-why">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </section>
  )
}
