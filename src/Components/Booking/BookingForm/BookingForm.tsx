"use client";
import React, { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { stepsForm } from "@/constants/BookingConstants";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { validateStep, type FormErrors } from "@/utils/booking-validation";

import StepService from "./steps/steps-service/steps-service";
import StepDetails from "./steps/steps-details/steps-details";
import StepSchedule from "./steps/steps-schedule/steps-schedule";

const BookingForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  // Get all necessary state and actions from the store
  const {
    formValues,
    updateField,
    updateExtras,
    services,
  } = useBookingStore();


  const handleChange = <K extends keyof typeof formValues>(
    field: K,
    value: (typeof formValues)[K]
  ) => {
    updateField(field, value);
    // Clear the error for the specific field being updated
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const validationErrors = validateStep(activeStep, formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (activeStep < stepsForm.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setErrors({}); // Clear errors when going back
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Validate all steps before final submission
    const allErrors: FormErrors = [0, 1, 2].reduce((acc, step) => {
      const stepErrors = validateStep(step, formValues);
      return { ...acc, ...stepErrors };
    }, {});

    if (Object.keys(allErrors).length > 0) {
      // Find the first step with an error and navigate to it
      const firstErrorStep = [0, 1, 2].find(
        (step) => Object.keys(validateStep(step, formValues)).length > 0
      );
      if (firstErrorStep !== undefined) {
        setActiveStep(firstErrorStep);
        setErrors(validateStep(firstErrorStep, formValues));
      }
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
            errors={errors}
          />
        );
      case 1:
        return <StepDetails formValues={formValues} onChange={handleChange} errors={errors} />;
      case 2:
        return <StepSchedule formValues={formValues} onChange={handleChange} errors={errors} />;
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
