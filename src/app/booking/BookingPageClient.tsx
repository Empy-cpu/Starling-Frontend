"use client";

import React, { useEffect } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import BookingForm from '@/Components/Booking/BookingForm/BookingForm';
import BookingSummaryCard from '@/Components/Booking/BookingSummaryCard/BookingSummaryCard';
import BookingSteps from '@/Components/Booking/BookingSteps/BookingSteps';
import type { CleaningService, Extra } from '@/types/booking-services';

interface BookingPageClientProps {
  services: CleaningService[];
  extras: (Extra & { image?: string; description?: string })[];
}

const BookingPageClient: React.FC<BookingPageClientProps> = ({ services, extras }) => {
  const { initialize, formValues } = useBookingStore();

  useEffect(() => {
    initialize({ services, extrasOptions: extras });
  }, [initialize, services, extras]);

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

export default BookingPageClient;
