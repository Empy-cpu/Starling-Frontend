"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/Auth/auth";
import { styles } from "./login-styles";

type LoginFormState = {
  email: string;
  password: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormState, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setLoginError("");

    if (field === "email") {
      setEmailError(
        emailRegex.test(value) || value === ""
          ? ""
          : "Enter a valid email address"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password || emailError) return;

    setLoading(true);
    setLoginError("");

    try {
      const response = await loginUser(loginForm.email, loginForm.password);

      if (!response.isVerified) {
        setLoginError("Please verify your email before logging in.");
        return;
      }

      if (typeof window !== "undefined") {
        const { firstName, lastName, email, role } = response;
        localStorage.setItem(
          "user",
          JSON.stringify({ firstName, lastName, email, role })
        );
      }

      router.push(
        response.role === "Admin" ? "/dashboards/admin" : "/dashboards/customer"
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.page}>
      <Container sx={styles.container}>
        {/* Logo at the top of the form */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          '&:hover': { opacity: 0.8 } 
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box 
              component="span"
              sx={{
                display: 'inline-block',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <Image 
                src="/Images/NEW_STARLING_LOGO.jpg" 
                alt="Starling Logo" 
                width={150}
                height={50}
                style={{
                  height: 'auto',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Link>
        </Box>

        <Card sx={styles.card}>
          <CardContent sx={styles.content}>
            <Box sx={styles.header}>
              <Typography variant="h3" sx={styles.title}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={styles.subtitle}>
                Sign in to your Starling Cleaners account
              </Typography>
            </Box>

            <Box sx={styles.form}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={loginForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                sx={styles.input}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={styles.icon} />
                    </InputAdornment>
                  ),
                }}
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                sx={styles.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={styles.icon} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={loading}
              />

              <Box sx={styles.options}>
                <MuiLink
                  component={Link}
                  href="/auth/forget-password"
                  sx={styles.forgotPassword}
                  underline="hover"
                >
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={styles.button}
                onClick={handleLogin}
                disabled={
                  !loginForm.email ||
                  !loginForm.password ||
                  !!emailError ||
                  loading
                }
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {loginError && (
                <Typography color="error" mt={2}>
                  {loginError}
                </Typography>
              )}
            </Box>

            <Box sx={styles.registerSection}>
              <Typography variant="body2" sx={styles.registerText}>
                Don’t have an account?{" "}
                <MuiLink
                  component={Link}
                  href="/auth/registration"
                  sx={styles.registerLink}
                  underline="hover"
                >
                  Create Account
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
