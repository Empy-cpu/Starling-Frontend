"use client";

import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import "./BookingSummaryCard.css";
import { useBookingStore } from "@/store/useBookingStore";

import type { BookingFormValues } from "@/types/booking-form";

interface BookingSummaryCardProps {
  formValues: BookingFormValues;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = React.memo(
  ({ formValues }) => {
    // Get pricing data from the store and force update when form values change
    const pricing = useBookingStore((state) => state.getPricing());
    
    // Get extras breakdown from pricing
    const { extrasBreakdown = [], baseSubtotal = 0, discount = 0, total = 0 } = pricing || {};
    
    // Calculate values for display
    const extrasTotal = React.useMemo(() => 
      extrasBreakdown.reduce((sum, e) => sum + (e.total || 0), 0), 
      [extrasBreakdown]
    );
    
    const beforeDiscount = baseSubtotal + extrasTotal;
    const hasExtras = extrasBreakdown.length > 0;
    
    // Recalculate pricing when form values change
    const recalculatePricing = useBookingStore((state) => state.recalculatePricing);
    
    React.useEffect(() => {
      // Ensure we have all required fields before recalculating
      if (formValues.service && formValues.size) {
        recalculatePricing({
          ...formValues,
          // Ensure bedrooms is a number, default to 0 if not set
          bedrooms: typeof formValues.bedrooms === 'number' ? formValues.bedrooms : 0,
          // Ensure extras is an object
          extras: formValues.extras || {}
        });
      }
    }, [formValues.service, formValues.size, formValues.extras, formValues.bedrooms, recalculatePricing, formValues]);

    return (
      <Card className="booking-summary-card" elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "#1976d2", mb: 1 }}
          >
            Booking Summary
          </Typography>
          <Divider sx={{ mb: 2, borderBottomWidth: "2px" }} />

          <Box className="summary-row">
            <Typography>
              {formValues.service} – {formValues.size}
            </Typography>
            <Typography>${(baseSubtotal || 0).toFixed(2)}</Typography>
          </Box>

          {hasExtras && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                Extras
              </Typography>
              {extrasBreakdown?.map((extra, index) => (
                <Box key={index} className="summary-row">
                  <Typography>
                    {extra.name} × {extra.quantity}
                  </Typography>
                  <Typography>${(extra.price * extra.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
            Date & Time
          </Typography>
          <Typography variant="body2" gutterBottom>
            {formValues.date || "Not selected"} –{" "}
            {formValues.time || "Not selected"}
          </Typography>

          <Typography fontWeight="bold" sx={{ mt: 1 }}>
            Occurrence
          </Typography>
          <Typography variant="body2" gutterBottom>
            {formValues.frequency}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Box className="summary-row">
            <Typography>SUBTOTAL</Typography>
            <Typography>${beforeDiscount.toFixed(2)}</Typography>
          </Box>

          {discount && discount > 0 && (
            <Box className="summary-row">
              <Typography>DISCOUNT ({formValues.frequency})</Typography>
              <Typography color="green">-${discount.toFixed(2)}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
          <Box className="summary-row total-row">
            <Typography variant="h6" fontWeight="bold">
              TOTAL
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ${total ? total.toFixed(2) : '0.00'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

BookingSummaryCard.displayName = "BookingSummaryCard";

export default BookingSummaryCard;
