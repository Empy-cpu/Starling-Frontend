"use client"
import { Box, Typography, Container, Card, CardContent, Divider } from "@mui/material"
import "./style.css"

export default function TermsSection() {
  return (
    <section className="terms-section" id="terms">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-terms">
            Terms and Conditions
          </Typography>
          <Typography variant="h6" className="section-subtitle">
            Please read these terms carefully before using our services
          </Typography>
        </Box>

        <Card className="terms-card">
          <CardContent className="terms-content">
            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                1. Service Agreement
              </Typography>
              <Typography variant="body1" className="terms-text">
                By booking our cleaning services, you agree to these terms and conditions. Our services are provided
                subject to availability and confirmation of booking details.
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                2. Booking and Payment
              </Typography>
              <Typography variant="body1" className="terms-text">
                • Payment is due upon completion of service unless otherwise arranged
                <br />• We accept credit cards and bank transfer
                <br />• Cancellations must be made at least 24 hours in advance
                <br />• Same-day cancellations may incur a 50% charge
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                3. Access and Security
              </Typography>
              <Typography variant="body1" className="terms-text">
                • You are responsible for providing safe and secure access to your property
                <br />• Please ensure all valuable items are secured
                <br />• Any access codes or keys provided will be kept confidential
                <br />• We recommend being present during the first cleaning
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                4. Liability and Insurance
              </Typography>
              <Typography variant="body1" className="terms-text">
                • We carry comprehensive public liability insurance
                <br />• Our liability is limited to the cost of the cleaning service
                <br />• Pre-existing damage should be reported before cleaning begins
                <br />• We are not responsible for items left in an unsafe or unstable condition
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                5. Satisfaction Guarantee
              </Typography>
              <Typography variant="body1" className="terms-text">
                • We offer a 100% satisfaction guarantee
                <br />• Any concerns must be reported within 24 hours of service completion
                <br />• We will return to address any issues at no additional cost
                <br />• Guarantee applies to the specific areas cleaned during the service
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                6. Health and Safety
              </Typography>
              <Typography variant="body1" className="terms-text">
                • Please inform us of any health conditions, allergies, or special requirements
                <br />• Ensure pets are secured or removed from cleaning areas
                <br />• We use eco-friendly products but please advise of any sensitivities
                <br />• Our staff follow strict health and safety protocols
              </Typography>
            </Box>

            <Divider className="terms-divider" />

            <Box className="terms-section-block">
              <Typography variant="h5" className="terms-section-title">
                7. Privacy Policy
              </Typography>
              <Typography variant="body1" className="terms-text">
                • We respect your privacy and protect your personal information
                <br />• Information is only used for service delivery and communication
                <br />• We do not share your details with third parties
                <br />• You may request deletion of your data at any time
              </Typography>
            </Box>

            <Box className="terms-footer">
              <Typography variant="body2" className="terms-footer-text">
                <strong>Last updated:</strong> August 2025
                <br />
                <strong>Contact:</strong> For questions about these terms, contact us at <strong><a href="mailto:peer@starlingcleaners.com.au">peer@starlingcleaners.com.au</a></strong> or <strong><a href="tel:0468300130">0468 300 130</a></strong>
                
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}
