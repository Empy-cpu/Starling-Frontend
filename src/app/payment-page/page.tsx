"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import "./style.css";

interface PaymentDetails {
  customerName: string;
  service: string;
  date: string;
  totalAmount: number;
  status: "Pending" | "Paid";
}

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPaymentDetails({
        customerName: "John Doe",
        service: "One Bedroom Apt/Home Cleaning",
        date: "Choose service date...",
        totalAmount: 171.11,
        status: "Pending",
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="payment-loading">
        <CircularProgress />
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="payment-loading">
        <Typography color="error">Unable to load payment info.</Typography>
      </div>
    );
  }

  const { customerName, service, date, totalAmount, status } = paymentDetails;
  const subtotal = 169.0;
  const fee = 2.11;

  return (
    <div className="payment-container">
      <Paper className="payment-card" elevation={3}>
        <Typography variant="h5" gutterBottom>
          Pay for Your Cleaning
        </Typography>

        <div className="payment-info">
          <Typography><strong>Name:</strong> {customerName}</Typography>
          <Typography><strong>Service:</strong> {service}</Typography>
          <Typography><strong>Date:</strong> {date}</Typography>
        </div>

        <Divider className="payment-divider" />

        <div className="payment-summary">
          <Typography variant="subtitle1">Payment Summary</Typography>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>1.25% CC Fee</span>
            <span>${fee.toFixed(2)}</span>
          </div>
          <Divider className="payment-divider" />
          <div className="summary-line total">
            <strong>Total</strong>
            <strong>${totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="pay-button"
          disabled={status !== "Pending"}
          onClick={() => alert("Redirecting to payment gateway...")}
        >
          Pay Now
        </Button>
      </Paper>
    </div>
  );
};

export default PaymentPage;
