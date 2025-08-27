"use client"
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import "./style.css"

export default function FAQSection() {
  const faqs = [
    {
      question: "What cleaning services do you offer?",
      answer:
        "We offer general house cleaning and end of lease cleaning. All our services are customizable to meet your specific needs.",
    },
    {
      question: "How much do your cleaning services cost?",
      answer:
        "Our pricing varies based on the size of your property, type of service, and frequency. General house cleaning starts from $135 and end of lease cleaning from $335. Contact us for a free, personalized quote.",
    },
    {
      question: "Are you insured and bonded?",
      answer:
        "Yes, we are fully insured and bonded. We carry comprehensive liability insurance and all our cleaners are background checked for your peace of mind.",
    },
    {
      question: "What cleaning products do you use?",
      answer:
        "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets. If you have specific product preferences or allergies, please let us know and we'll accommodate your needs.",
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer:
        "No, you don't need to be home. Many of our clients provide us with access instructions and go about their day. We're fully insured and our cleaners are thoroughly vetted.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 48 hours in advance for regular cleaning and 1 week for end of lease cleaning. However, we often accommodate same-day requests based on availability.",
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll return within 24 hours to re-clean any areas of concern at no extra charge.",
    },
    {
      question: "Do you bring your own cleaning supplies and equipment?",
      answer:
        "Yes, we bring all necessary cleaning supplies and equipment. Our cleaners come fully equipped with professional-grade tools and eco-friendly products.",
    },
    {
      question: "Can I request the same cleaner each time?",
      answer:
        "We understand the importance of consistency and trust. You can request the same cleaner for all your regular cleaning appointments.",
    },
    {
      question: "Do you offer emergency or same-day cleaning?",
      answer:
        "Yes, we offer emergency and same-day cleaning services based on availability. Additional charges may apply for urgent requests. Call us at 03 9088 3118 for immediate assistance.",
    },
  ]

  return (
    <section className="faq-section" id="faq">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-faq">
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" className="section-subtitle-faq">
            Find answers to common questions about our cleaning services
          </Typography>
        </Box>

        <Box className="faq-content">
          {faqs.map((faq, index) => (
            <Accordion key={index} className="faq-accordion">
              <AccordionSummary expandIcon={<ExpandMore />} className="faq-summary">
                <Typography variant="h6" className="faq-question">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="faq-details">
                <Typography variant="body1" className="faq-answer">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box className="faq-cta">
          <Typography variant="h5" className="faq-cta-title">
            Still have questions?
          </Typography>
          <Typography variant="body1" className="faq-cta-subtitle">
            Can&rsquo;t find what you&rsquo;re looking for? Get in touch with our friendly team.
          </Typography>
          <Box className="faq-cta-buttons">
            <Typography variant="body2" className="contact-option">
              📞 Call us: <strong><a href="tel:+61468300130">0468 300 130</a></strong>
            </Typography>
            <Typography variant="body2" className="contact-option">
              ✉️ Email: <strong><a href="mailto:peer@starlingcleaners.com.au">peer@starlingcleaners.com.au</a></strong>
            </Typography>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
