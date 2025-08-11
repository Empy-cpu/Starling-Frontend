"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import {
  AdminBooking,
  UpdateBookingStatusDto,
  BookingStatus,
} from "@/types/admin-booking";
import { useState } from "react";
import { useAdminBookingStore } from "@/store/admin-booking-store";
import ViewBookingDialog from "@/Components/admin/view-complete-info";

interface BookingTableProps {
  bookings: AdminBooking[];
}

const statusColors: Record<
  BookingStatus,
  "warning" | "success" | "info" | "default" | "error"
> = {
  Pending: "warning",
  Confirmed: "success",
  Paid: "info",
  Completed: "default",
  Cancelled: "error",
};

export default function BookingTable({ bookings }: BookingTableProps) {
  const { updateBookingStatus } = useAdminBookingStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [bookingToView, setBookingToView] = useState<AdminBooking | null>(null);

  const handleChipClick = (
    event: React.MouseEvent<HTMLElement>,
    bookingId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(bookingId);
  };

  const handleMenuClose = async (newStatus?: BookingStatus) => {
    setAnchorEl(null);
    if (newStatus && selectedBookingId) {
      const dto: UpdateBookingStatusDto = { status: newStatus };
      try {
        await updateBookingStatus(selectedBookingId, dto);
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
    setSelectedBookingId(null);
  };

  const handleCustomerClick = (booking: AdminBooking) => {
    setBookingToView(booking);
    setViewDialogOpen(true);
  };

  if (bookings.length === 0) {
    return <Typography>No bookings available.</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time Window</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleCustomerClick(booking)}
                >
                  <Box>
                    <Typography variant="body2" color="primary.main">
                      {booking.customerName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {booking.guestEmail || booking.customerEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      {booking.cleaningServiceName}
                    </Typography>
                    {booking.extras.length > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        Extras:{" "}
                        {booking.extras
                          .map((e) => `${e.name} (${e.quantity})`)
                          .join(", ")}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>{booking.bedroomCount}</TableCell>
                <TableCell>{booking.bookingDate}</TableCell>
                <TableCell>{booking.timeWindow}</TableCell>
                <TableCell>{booking.frequency}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    onClick={(e) => handleChipClick(e, booking.bookingId)}
                    color={statusColors[booking.status]}
                    size="small"
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell align="right">
                  ${booking.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
        disableScrollLock={true}
      >
        {["Pending", "Confirmed", "Paid", "Completed", "Cancelled"].map(
          (status) => (
            <MenuItem
              key={status}
              onClick={() => handleMenuClose(status as BookingStatus)}
            >
              {status}
            </MenuItem>
          )
        )}
      </Menu>

      {bookingToView && (
        <ViewBookingDialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          booking={bookingToView}
        />
      )}
    </>
  );
}
