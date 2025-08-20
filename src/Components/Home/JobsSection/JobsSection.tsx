'use client';

import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import { Work, Schedule, AttachMoney, EmojiPeople, Star } from "@mui/icons-material";
import './JobsSection.css';

export default function JobsSection() {
  const jobBenefits = [
    {
      title: "Competitive Pay",
      description: "Earn $25-35/hour with performance bonuses",
      icon: <AttachMoney />,
    },
    {
      title: "Flexible Hours",
      description: "Choose your schedule - part-time or full-time",
      icon: <Schedule />,
    },
    {
      title: "Great Team",
      description: "Join a supportive and friendly work environment",
      icon: <EmojiPeople />,
    },
    {
      title: "Career Growth",
      description: "Opportunities for advancement and skill development",
      icon: <Star />,
    },
  ];



  return (
    <section id="careers" className="jobs-section">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2" className="section-title-jobs">
            Join Our Team
          </Typography>
          <Typography variant="h6" className="section-subtitle-jobs">
            Love cleaning? We&#39;re always looking for dedicated professionals to join our growing team
          </Typography>
        </Box>

        <Box className="jobs-content">
          <Box className="job-intro">
            <Card className="intro-card">
              <CardContent>
                <Box className="intro-icon">
                  <Work />
                </Box>
                <Typography variant="h4" className="intro-title">
                  Now Hiring Cleaners
                </Typography>
                <Typography variant="body1" className="intro-description">
                  Be part of Melbourne&#39;s premier cleaning service. We offer competitive wages, flexible schedules, and a
                  supportive work environment where you can grow your career. Call us at 03 9088 3118 to discuss
                  opportunities.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box className="job-details">
            <Box className="benefits-section">
              <Typography variant="h5" className="subsection-title">
                Why Work With Us?
              </Typography>
              <Box className="benefits-grid">
                {jobBenefits.map((benefit, index) => (
                  <Card key={index} className="benefit-card">
                    <CardContent>
                      <Box className="benefit-icon">{benefit.icon}</Box>
                      <Typography variant="h6" className="benefit-title">
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" className="benefit-description">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

          
          </Box>
        </Box>
      </Container>
    </section>
  );
}
