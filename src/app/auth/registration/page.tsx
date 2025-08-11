"use client";
import { useRouter } from "next/navigation";
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
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  Phone,
} from "@mui/icons-material";
import Link from "next/link";
import { registerUser } from "@/services/Auth/auth";
import { styles } from "./register-styles"; // ⬅️ IMPORT MUI STYLES

type RegistrationFormState = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export default function Registration() {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordMatch = form.password === form.confirmPassword;
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    field: keyof RegistrationFormState,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const isFormValid = (): boolean =>
    Object.values(form).every(Boolean) && passwordMatch;

  const handleRegistration = async () => {
    if (!passwordMatch || loading) return;
    setLoading(true);

    try {
      const { firstName, lastName, email, phone, password } = form;
      await registerUser({ firstName, lastName, email, phone, password });
      alert("Please check your email to verify your account.");
      router.push("/auth/email-verifcation");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred.";
      alert(`Registration failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.page}>
      {/* Logo at the top-left */}
      <Link href="/" passHref>
        <Box component="span" sx={styles.logoContainer}>
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
      
      <Container sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent sx={styles.content}>
            <Box sx={styles.header}>
              <Typography variant="h3" sx={styles.title}>
                Create Account
              </Typography>
              <Typography variant="body1" sx={styles.subtitle}>
                Register with us for exclusive discounts!
              </Typography>
            </Box>

            <Box sx={styles.form}>
              <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={form.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
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
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                error={!passwordMatch}
                helperText={!passwordMatch ? "Passwords do not match" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleRegistration}
                sx={styles.button}
                disabled={!isFormValid() || loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Box>

            <Box>
              <Typography variant="body2" sx={styles.loginText}>
                Already have an account?{" "}
                <Link href="/auth/login" passHref>
                  <MuiLink component="span" sx={styles.loginLink}>
                    Sign In
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
