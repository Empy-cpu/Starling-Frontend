// ViewBookingDialog.tsx
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AdminBooking } from "@/types/admin-booking";

interface Props {
  booking: AdminBooking;
  open: boolean;
  onClose: () => void;
}

export default function ViewBookingDialog({ booking, open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          {/* Customer Information Section */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
            Customer Information
          </Typography>
          <Box sx={{ pl: 2, mb: 3, borderLeft: '3px solid', borderColor: 'primary.main' }}>
            <Typography variant="subtitle2">Name:</Typography>
            <Typography gutterBottom>{booking.customerName}</Typography>
            
            <Typography variant="subtitle2">Email:</Typography>
            <Typography gutterBottom>{booking.customerEmail}</Typography>
            
            <Typography variant="subtitle2">Phone:</Typography>
            <Typography gutterBottom>{booking.customerPhone || 'Not provided'}</Typography>
            
            {booking.address && (
              <>
                <Typography variant="subtitle2">Address:</Typography>
                <Typography gutterBottom>{booking.address}</Typography>
              </>
            )}
            
            <Typography variant="subtitle2">Pets in Home:</Typography>
            <Typography gutterBottom>{booking.hasPets ? "Yes" : "No"}</Typography>
            
            <Typography variant="subtitle2">Recently Cleaned:</Typography>
            <Typography gutterBottom>{booking.cleanedRecently ? "Yes" : "No"}</Typography>
            
            <Typography variant="subtitle2">Entry Instructions:</Typography>
            <Typography gutterBottom>
              {booking.entryInstructions || 'No entry instructions provided'}
            </Typography>
            
            {booking.guestName && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold' }}>Guest Information</Typography>
                <Typography variant="subtitle2">Guest Name:</Typography>
                <Typography gutterBottom>{booking.guestName}</Typography>
                
                <Typography variant="subtitle2">Guest Email:</Typography>
                <Typography gutterBottom>{booking.guestEmail}</Typography>
              </>
            )}
          </Box>
          
          {/* Service Details Section */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
            Service Details
          </Typography>
          <Box sx={{ pl: 2, mb: 3, borderLeft: '3px solid', borderColor: 'secondary.main' }}>
            <Typography variant="subtitle2">Service:</Typography>
            <Typography gutterBottom>{booking.cleaningServiceName}</Typography>
            
            <Typography variant="subtitle2">Bedrooms:</Typography>
            <Typography gutterBottom>{booking.bedroomCount}</Typography>
            
            {booking.extras.length > 0 && (
              <>
                <Typography variant="subtitle2">Extras:</Typography>
                <List dense sx={{ py: 0, mb: 1 }}>
                  {booking.extras.map((extra, index) => (
                    <ListItem key={index} sx={{ py: 0, pl: 2 }}>
                      <ListItemText 
                        primary={`${extra.name} x${extra.quantity}`} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
          
          {/* Booking & Payment Section */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
            Booking & Payment
          </Typography>
          <Box sx={{ pl: 2, mb: 2, borderLeft: '3px solid', borderColor: 'success.main' }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Booking Date:</Typography>
              <Typography>{booking.bookingDate}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Time Window:</Typography>
              <Typography>{booking.timeWindow}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Frequency:</Typography>
              <Typography>{booking.frequency}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" sx={{ mt: 1, pt: 1, borderTop: '1px dashed', borderColor: 'divider' }}>
              <Typography variant="subtitle2">Total Price:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${booking.totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Payment Method:</Typography>
              <Typography>{booking.paymentType}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2">Status:</Typography>
              <Typography 
                sx={{
                  color: booking.status === 'Completed' ? 'success.main' : 
                        booking.status === 'Cancelled' ? 'error.main' :
                        'warning.main',
                  fontWeight: 'medium'
                }}
              >
                {booking.status}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
