"use client";

import React, { useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircleOutline,
  CleaningServicesOutlined,
  LocationOnOutlined,
  PaymentOutlined,
  CalendarTodayOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import {
  createCustomerBooking,
  createGuestBooking,
} from "@/services/booking-service/booking-service";
import { getCurrentUser } from "@/services/Auth/auth";
import { BookingRequestDto } from "@/types/booking-request-dto";
import "./style.css";
import { calculateBookingPricing } from "@/utils/booking-pricing-calculator";

const ConfirmBookingPage: React.FC = () => {
  const router = useRouter();
  const {
    formValues: bookingDetails,
    resetForm,
    services,
    extrasOptions,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Corrected: Pass full services array for pricing
  const pricing = calculateBookingPricing(
    bookingDetails,
    services,
    extrasOptions
  );

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount || 0);

  const selectedService = services.find(
    (s) => s.name === bookingDetails.service
  );

  const parseBedroomCount = (size: string): number => {
    const match = size.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError("");

    try {
      let user = null;

      try {
        user = await getCurrentUser();
      } catch {
        user = null; // No logged in user
      }

      const extrasArray = Object.entries(bookingDetails.extras || {})
        .filter(([, quantity]) => quantity > 0)
        .map(([extraId, quantity]) => {
          const matchingExtra = extrasOptions.find((e) => e.id === extraId);
          if (!matchingExtra) {
            throw new Error(`Extra "${extraId}" not found in extrasOptions.`);
          }
          return {
            ExtraId: matchingExtra.id,
            Quantity: quantity,
          };
        });

      const bookingRequest: BookingRequestDto = {
        serviceId: selectedService?.serviceId ?? "",
        bedroomCount: parseBedroomCount(bookingDetails.size),
        bookingDate: bookingDetails.date,
        timeWindow: bookingDetails.time,
        frequency: bookingDetails.frequency,
        paymentType: bookingDetails.payment,
        Extras: extrasArray,
        phone: bookingDetails.phone,
        address: bookingDetails.address,
        hasPets: bookingDetails.pets?.toLowerCase() === "yes",
        cleanedRecently:
          bookingDetails.cleanedRecently?.toLowerCase() === "yes",
        entryInstructions: bookingDetails.access || undefined,
      };

      if (user?.id) {
        // Logged-in customer
        bookingRequest.customerId = user.id;
        await createCustomerBooking(bookingRequest);
      } else {
        // Guest booking
        if (
          !bookingDetails.name ||
          !bookingDetails.email ||
          !bookingDetails.phone ||
          !bookingDetails.address
        ) {
          setError("Please fill out all required guest fields.");
          setLoading(false);
          return;
        }

        bookingRequest.guest = {
          firstName: bookingDetails.name,
          lastName: bookingDetails.name.split(" ").slice(1).join(" ") || "",
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          address: bookingDetails.address,
          hasPets: bookingDetails.pets?.toLowerCase() === "yes",
          cleanedRecently:
            bookingDetails.cleanedRecently?.toLowerCase() === "yes",
          entryInstructions: bookingDetails.access || undefined,
        };

        await createGuestBooking(bookingRequest);
      }

      resetForm();
      router.push("/booking-summary");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: string };
          message?: string;
        };
        setError(
          axiosError.response?.data ||
            axiosError.message ||
            "An unexpected error occurred."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDetails || !bookingDetails.service) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No booking details found.</Typography>
        <Button variant="contained" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <div className="summary-container">
      <Paper className="summary-card" elevation={3}>
        <Box className="summary-header">
          <CheckCircleOutline className="summary-icon" />
          <Typography variant="h5">Confirm your Booking</Typography>
          <Typography variant="subtitle1" align="center">
            Thank you, {bookingDetails.name?.split(" ")[0]}. Review your booking
            below and confirm to proceed.
          </Typography>
        </Box>

        <Divider className="summary-divider" />

        {/* Service Info */}
        <Box className="summary-section">
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            <CleaningServicesOutlined sx={{ mr: 1 }} />
            Service Details
          </Typography>
          <Box pl={3}>
            <Typography variant="body2">
              <strong>Service:</strong> {bookingDetails.service} —{" "}
              {formatCurrency(pricing.baseSubtotal)}
            </Typography>
            <Typography variant="body2">
              <strong>Bedroom Count:</strong> {bookingDetails.size}
            </Typography>
            <Typography variant="body2">
              <strong>Frequency:</strong> {bookingDetails.frequency}
              {pricing.discount > 0 && (
                <>
                  {" "}
                  —{" "}
                  <span style={{ color: "green" }}>
                    Discount: {formatCurrency(pricing.discount)}
                  </span>
                </>
              )}
            </Typography>
            <Typography variant="body2">
              <CalendarTodayOutlined sx={{ mr: 1 }} fontSize="small" />
              <strong>Date:</strong> {bookingDetails.date}
            </Typography>
            <Typography variant="body2">
              <AccessTimeOutlined sx={{ mr: 1 }} fontSize="small" />
              <strong>Time:</strong> {bookingDetails.time}
            </Typography>

            {pricing.extrasBreakdown.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Extras:
                </Typography>
                <ul style={{ marginTop: 4 }}>
                  {pricing.extrasBreakdown.map((extra) => (
                    <li key={extra.name}>
                      <Typography variant="body2">
                        {extra.name}{" "}
                        {extra.quantity > 1 ? `x${extra.quantity}` : ""} —{" "}
                        {formatCurrency(extra.total)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        </Box>

        {/* Location Info */}
        <Box className="summary-section">
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            <LocationOnOutlined sx={{ mr: 1 }} />
            Location
          </Typography>
          <Box pl={3}>
            <Typography variant="body2">{bookingDetails.address}</Typography>
            {(bookingDetails.access || bookingDetails.pets) && (
              <Box mt={1}>
                {bookingDetails.access && (
                  <Typography variant="subtitle2" fontWeight={600}>
                    Entry Instructions: {bookingDetails.access}
                  </Typography>
                )}
                {bookingDetails.pets && (
                  <Typography variant="body2" fontStyle="italic">
                    Pets: {bookingDetails.pets}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Payment Info */}
        <Box className="summary-section">
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            <PaymentOutlined sx={{ mr: 1 }} />
            Payment Summary
          </Typography>
          <Box pl={3}>
            <Typography variant="body2">
              Subtotal: {formatCurrency(pricing.rawSubtotal)}
            </Typography>
            <Typography variant="body2">
              GST (10%): {formatCurrency(pricing.gst)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Total: {formatCurrency(pricing.total)}
            </Typography>
            <Typography variant="caption">
              Payment Method: {bookingDetails.payment}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Box mt={2}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}

        <Divider className="summary-divider" />

        {/* Confirm Button */}
        <Box mt={4}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleConfirmBooking}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 6px rgba(76, 175, 80, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(76, 175, 80, 0.3)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm Booking"
            )}
          </Button>

          <Box mt={2} textAlign="center">
            <Button
              variant="text"
              size="small"
              onClick={() => router.back()}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default ConfirmBookingPage;
