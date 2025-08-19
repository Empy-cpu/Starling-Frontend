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
import type { FormErrors } from "@/utils/booking-validation";
import { Typography } from "@mui/material";
import { getCurrentUser } from "@/services/Auth/auth";
import "./steps-details.css";

interface StepDetailsProps {
  formValues: BookingFormValues;
  onChange: <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => void;
  errors: FormErrors;
}

const StepDetails: React.FC<StepDetailsProps> = ({ formValues, onChange, errors }) => {
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


  return (
    <Box className="step-details">
      <TextField
        label="Full Name"
        fullWidth
        value={formValues.name}
        onChange={(e) => onChange("name", e.target.value)}
        disabled={isLoggedIn}
        error={!!errors.name}
        helperText={errors.name}
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
        onChange={(e) => onChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
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
        onChange={(e) => onChange("phone", e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
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
        error={!!errors.address}
        helperText={errors.address}
      />

      <TextField
        label="Access Instructions"
        fullWidth
        value={formValues.access}
        onChange={(e) => onChange("access", e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl sx={{ mb: 2 }} error={!!errors.pets}>
        <FormLabel>Do you have pets?</FormLabel>
        <RadioGroup
          row
          value={formValues.pets}
          onChange={(e) => onChange("pets", e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {errors.pets && <Typography color="error" variant="caption" sx={{ pl: 2 }}>{errors.pets}</Typography>}
      </FormControl>

      <FormControl error={!!errors.cleanedRecently}>
        <FormLabel>Has your home been cleaned recently?</FormLabel>
        <RadioGroup
          row
          value={formValues.cleanedRecently}
          onChange={(e) => onChange("cleanedRecently", e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {errors.cleanedRecently && <Typography color="error" variant="caption" sx={{ pl: 2 }}>{errors.cleanedRecently}</Typography>}
      </FormControl>
    </Box>
  );
};

export default StepDetails;
