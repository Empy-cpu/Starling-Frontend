"use client"
import { Box, Typography,  Container, Card, CardContent, Avatar, Rating, Chip } from "@mui/material"
import "./ReviewsSection.css"

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 4.5,
      comment:
        "Absolutely fantastic service! My house has never been cleaner. The team was professional, punctual, and thorough.",
      service: "General House Cleaning",
      location: "Melbourne CBD",
    }
   
  ]

  return (
    <section id="reviews" className="reviews-section">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-reviews">
            What Our Customers Say
          </Typography>
          <Typography variant="h6" className="section-subtitle-reviews">
            Don&#39;t just take our word for it - hear from our satisfied customers
          </Typography>
        </Box>
        <Box className="reviews-grid">
          {reviews.map((review, index) => (
            <Card key={index} className="review-card">
              <CardContent>
                <Box className="review-header">
                  <Avatar className="review-avatar">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Box className="review-info">
                    <Typography variant="h6" className="review-name">
                      {review.name}
                    </Typography>
                    <Typography variant="caption" className="review-location">
                      {review.location}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" className="review-comment">
                  &rdquo;{review.comment}&rdquo;
                </Typography>
                <Chip label={review.service} size="small" className="review-service" />
              </CardContent>
            </Card>
          ))}
        </Box>
        
      </Container>
    </section>
  )
}
