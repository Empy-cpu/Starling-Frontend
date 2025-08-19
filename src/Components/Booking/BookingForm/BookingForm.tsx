"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { stepsForm } from "@/constants/BookingConstants";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";

import StepService from "./steps/steps-service/steps-service";
import StepDetails from "./steps/steps-details/steps-details";
import StepSchedule from "./steps/steps-schedule/steps-schedule";

const BookingForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  
  // Get all necessary state and actions from the store
  const {
    formValues,
    updateField,
    updateExtras,
    fetchBackendData,
    validateForm,
    services,
  } = useBookingStore();


  const handleChange = <K extends keyof typeof formValues>(
    field: K,
    value: (typeof formValues)[K]
  ) => {
    updateField(field, value);
  };

  const handleNext = () => {
    if (activeStep < stepsForm.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please complete all required fields before submitting.");
      return;
    }
    router.push("/confirm-booking");
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepService
            formValues={formValues}
            availableServices={services}
            onChange={handleChange}
            onUpdateExtra={updateExtras}
          />
        );
      case 1:
        return <StepDetails formValues={formValues} onChange={handleChange} />;
      case 2:
        return <StepSchedule formValues={formValues} onChange={handleChange} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {stepsForm.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>{renderStep()}</Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === stepsForm.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Paper>
  );
};

export default BookingForm;
