"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import type { BookingFormValues } from "@/types/booking-form";
import { getCurrentUser } from "@/services/Auth/auth";
import "./steps-details.css";

interface StepDetailsProps {
  formValues: BookingFormValues;
  onChange: <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => void;
}

const StepDetails: React.FC<StepDetailsProps> = ({ formValues, onChange }) => {
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleUserUpdate = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        // Update all fields with user data, but only if they're empty
        // This ensures we don't overwrite any existing input
        const updates: Partial<BookingFormValues> = {};
        if (user.name && !formValues.name) updates.name = user.name;
        if (user.email && !formValues.email) updates.email = user.email;
        if (user.phone && !formValues.phone) updates.phone = user.phone;
        
        // Apply all updates at once
        Object.entries(updates).forEach(([key, value]) => {
          onChange(key as keyof BookingFormValues, value);
        });
      }
    } catch (error) {
      // User is not logged in or there was an error
      setIsLoggedIn(false);
      console.error('Failed to fetch user details:', error);
    }
  }, [formValues.name, formValues.email, formValues.phone, onChange]);

  // Fetch and set user details when component mounts
  useEffect(() => {
    handleUserUpdate();
  }, [handleUserUpdate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?\d{10,15}$/; // Allows optional + and 10–15 digits
    return phoneRegex.test(phone);
  };

  const handleEmailChange = (value: string) => {
    onChange("email", value);
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (value: string) => {
    onChange("phone", value);
    if (!validatePhone(value)) {
      setPhoneError("Please enter a valid phone number (10–15 digits).");
    } else {
      setPhoneError("");
    }
  };

  return (
    <Box className="step-details">
      <TextField
        label="Full Name"
        fullWidth
        value={formValues.name}
        onChange={(e) => onChange("name", e.target.value)}
        disabled={isLoggedIn}
        sx={{ mb: 2, '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: '#000000', // Keep text color black when disabled
          backgroundColor: 'rgba(0, 0, 0, 0.02)' // Slight gray background to indicate disabled state
        }}}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={formValues.email}
        onChange={(e) => handleEmailChange(e.target.value)}
        error={!!emailError}
        helperText={emailError}
        disabled={isLoggedIn}
        sx={{ 
          mb: 2,
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.02)'
          }
        }}
      />

      <TextField
        label="Phone Number"
        fullWidth
        value={formValues.phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        error={!!phoneError}
        helperText={phoneError}
        disabled={isLoggedIn}
        sx={{ 
          mb: 2,
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.02)'
          }
        }}
      />

      <TextField
        label="Address"
        fullWidth
        value={formValues.address}
        onChange={(e) => onChange("address", e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Access Instructions"
        fullWidth
        value={formValues.access}
        onChange={(e) => onChange("access", e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Do you have pets?</FormLabel>
        <RadioGroup
          row
          value={formValues.pets}
          onChange={(e) => onChange("pets", e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Has your home been cleaned recently?</FormLabel>
        <RadioGroup
          row
          value={formValues.cleanedRecently}
          onChange={(e) => onChange("cleanedRecently", e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default StepDetails;
