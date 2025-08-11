import React from "react";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./BookingSteps.css";

const steps = [
  {
    number: 1,
    label: "Pick your cleaning service",
    icon: <CleaningServicesIcon className="step-icon" />,
  },
  {
    number: 2,
    label: "Enter your details",
    icon: <PersonIcon className="step-icon" />,
  },
  {
    number: 3,
    label: "Select booking date & time",
    icon: <CalendarMonthIcon className="step-icon" />,
  },
];

const BookingSteps: React.FC = () => {
  return (
    <div className="steps-wrapper">
      <h2 className="steps-heading">It’s Easy as 1–2–3!</h2>
      <p className="steps-subtext">Book your home cleaning in just three simple steps</p>
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number">{step.number}</div>
            {step.icon}
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
