"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { AdminBooking, UpdateBookingAsAdminDto } from "@/types/admin-booking";
import { useAdminBookingStore } from "@/store/admin-booking-store";

interface EditBookingDialogProps {
  open: boolean;
  onClose: () => void;
  booking: AdminBooking;
}

export default function EditBookingDialog({
  open,
  onClose,
  booking,
}: EditBookingDialogProps) {
  const { updateBookingAsAdmin } = useAdminBookingStore();

  const [form, setForm] = useState<UpdateBookingAsAdminDto>({
    bookingDate: booking.bookingDate,
    timeWindow: booking.timeWindow,
    frequency: booking.frequency,
    paymentType: booking.paymentType,
    bedroomCount: booking.bedroomCount,
    totalPrice: booking.totalPrice,
    status: booking.status,
    address: booking.address,
    hasPets: booking.hasPets,
    entryInstructions: booking.entryInstructions,
    cleanedRecently: booking.cleanedRecently,
    extras: booking.extras,
  });

  const handleChange = <K extends keyof UpdateBookingAsAdminDto>(
    field: K,
    value: UpdateBookingAsAdminDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateBookingAsAdmin(booking.bookingId, form);
      onClose();
    } catch (error) {
      console.error("Failed to update booking", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Booking</DialogTitle>
      <DialogContent
        sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Booking Date"
          type="date"
          value={form.bookingDate}
          onChange={(e) => handleChange("bookingDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time Window"
          value={form.timeWindow}
          onChange={(e) => handleChange("timeWindow", e.target.value)}
        />
        <TextField
          label="Bedroom Count"
          type="number"
          value={form.bedroomCount}
          onChange={(e) => handleChange("bedroomCount", +e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status}
            label="Status"
            onChange={(e) => handleChange("status", e.target.value)}
            MenuProps={{ disableScrollLock: true }}
          >
            {["Pending", "Confirmed", "Paid", "Completed", "Cancelled"].map(
              (status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
