"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { sendForgotPasswordEmail } from "@/services/Auth/auth";
import { styles } from "./forget-password-styles";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await sendForgotPasswordEmail(email);
      setMessage(response);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Container maxWidth="sm">
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" sx={styles.title}>
              Forgot Password
            </Typography>
            <Typography variant="body2" sx={styles.subtitle}>
              Enter your registered email to receive a reset link.
            </Typography>

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <Button
              variant="contained"
              fullWidth
              sx={styles.button}
              onClick={handleSubmit}
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            {message && (
              <Typography sx={styles.successMessage}>{message}</Typography>
            )}
            {error && (
              <Typography sx={styles.errorMessage}>{error}</Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
