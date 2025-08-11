"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { resetUserPassword } from "@/services/Auth/auth";
import { styles } from "./reset-password-styles";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const token = searchParams?.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setError("Invalid or expired reset link.");
    }
  }, [email, token]);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!newPassword || newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await resetUserPassword({ email, token, newPassword });
      setMessage(result);
      setTimeout(() => router.push("/auth/login"), 2500);
    } catch {
      setError("Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <Box sx={styles.page}>
        <Container maxWidth="sm">
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="h5" sx={styles.title}>
                Invalid Reset Link
              </Typography>
              <Typography sx={{ textAlign: 'center', mb: 2 }}>
                The password reset link is invalid or has expired.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => router.push('/auth/forgot-password')}
                sx={styles.button}
              >
                Request New Reset Link
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.page}>
      <Container maxWidth="sm">
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" sx={styles.title}>
              Reset Password
            </Typography>

            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleReset}
              disabled={loading}
              sx={styles.button}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            {message && (
              <Typography sx={{ ...styles.message, ...styles.success }}>
                {message}
              </Typography>
            )}
            {error && (
              <Typography sx={{ ...styles.message, ...styles.error }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default function ResetPassword() {
  return (
    <Suspense 
      fallback={
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <CircularProgress />
        </Box>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
