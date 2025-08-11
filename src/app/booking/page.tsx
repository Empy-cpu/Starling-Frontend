"use client";
import React from "react";
import BookingSteps from "../../Components/Booking/BookingSteps/BookingSteps";
import BookingForm from "../../Components/Booking/BookingForm/BookingForm";
import BookingSummaryCard from "../../Components/Booking/BookingSummaryCard/BookingSummaryCard";

import "./style.css";
import { useBookingStore } from "@/store/useBookingStore";

const BookingPage: React.FC = () => {
  const formValues = useBookingStore((state) => state.formValues);

  return (
    <div className="booking-page">
      <div className="hero-section-steps">
        <BookingSteps />
      </div>
      <div className="booking-layout">
        <div className="booking-form-wrapper">
          <BookingForm />
        </div>
        <div className="booking-summary-wrapper">
          <BookingSummaryCard formValues={formValues} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
