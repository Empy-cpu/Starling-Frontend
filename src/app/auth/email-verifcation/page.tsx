import { Box, Typography, Container } from "@mui/material";

export default function VerifyEmailPage() {
  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h5" gutterBottom color="text.primary">
          Check Your Email
        </Typography>
        <Typography variant="body1" color="text.primary">
          We&apos;ve sent you a verification link. Please check your inbox and click the link to verify your account.
        </Typography>
      </Box>
    </Container>
  );
}
