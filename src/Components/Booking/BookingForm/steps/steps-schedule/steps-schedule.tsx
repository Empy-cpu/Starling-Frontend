"use client";

import React from "react";
import { Box, TextField, MenuItem, Typography, FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  times,
  cleaningFrequencies,
  paymentMethods,
} from "@/constants/BookingConstants";
import type { BookingFormValues } from "@/types/booking-form";
import type { FormErrors } from "@/utils/booking-validation";

import "./steps-schedule.css";

interface StepScheduleProps {
  formValues: BookingFormValues;
  onChange: <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => void;
  errors: FormErrors;
}

const StepSchedule: React.FC<StepScheduleProps> = ({
  formValues,
  onChange,
  errors,
}) => {
  const [isClient, setIsClient] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);

  // Set client-side rendering and default payment method
  React.useEffect(() => {
    setIsClient(true);
    
    // Only set the default payment method once when the component mounts
    if (!initialized && paymentMethods.length > 0) {
      onChange('payment', 'credit_card');
      setInitialized(true);
    }
  }, [formValues.payment, onChange, initialized]);
  return (
    <Box>
      {/* Date and Time */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select a Date"
            value={formValues.date ? new Date(formValues.date) : null}
            onChange={(newValue) => {
              if (newValue) {
                const formatted = newValue.toISOString().split("T")[0];
                onChange("date", formatted);
              }
            }}
            minDate={new Date()}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date,
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          select
          fullWidth
          label="Time Window"
          value={formValues.time}
          onChange={(e) => onChange("time", e.target.value)}
          SelectProps={{ MenuProps: { disableScrollLock: true } }}
          error={!!errors.time}
          helperText={errors.time}
        >
          {times.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Frequency Selection */}
      {formValues.service !== 'End of Lease Cleaning' && (
        <>
          <FormLabel className="booking-form-label" error={!!errors.frequency}>How often?</FormLabel>
          <Box className="frequency-options">
            {cleaningFrequencies.map((option) => (
              <Box
                key={option.value}
                className={`frequency-card${
                  formValues.frequency === option.value ? " selected" : ""
                }`}
                onClick={() => onChange("frequency", option.value)}
              >
                {option.label}
              </Box>
            ))}
          </Box>
          {errors.frequency && <Typography color="error" variant="caption" sx={{ display: 'block', mt: 0.5 }}>{errors.frequency}</Typography>}
        </>
      )}

      {/* Payment Selection - Only render on client side */}
      {isClient && (
        <>
          <FormLabel className="booking-form-label" sx={{ mt: 3 }} error={!!errors.payment}>
            Select Payment Method
          </FormLabel>
          <Box className="frequency-options">
            {paymentMethods.map((option) => (
              <Box
                key={option.value}
                className={`frequency-card${
                  formValues.payment === option.value ? " selected" : ""
                }`}
                onClick={() => onChange("payment", option.value)}
              >
                {option.label}
              </Box>
            ))}
          </Box>
          {errors.payment && <Typography color="error" variant="caption" sx={{ display: 'block', mt: 0.5 }}>{errors.payment}</Typography>}
        </>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        No worries—you’re only charged once you’re happy with the results.
      </Typography>
    </Box>
  );
};

export default StepSchedule;
