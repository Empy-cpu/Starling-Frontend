// components/BookingsTable.tsx
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  CalendarToday,
  CheckCircle,
  Schedule,
  Cancel,
  Visibility,
} from "@mui/icons-material";
import { bookingsTableStyles as styles } from "./booking-table-styles";

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "confirmed":
      return "primary";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return <CheckCircle fontSize="small" />;
    case "confirmed":
      return <CalendarToday fontSize="small" />;
    case "pending":
      return <Schedule fontSize="small" />;
    case "cancelled":
      return <Cancel fontSize="small" />;
    default:
      return <Schedule fontSize="small" />;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingsTable({ bookings }: { bookings: any[] }) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent>
          <Box sx={styles.header}>
            <Typography variant="h6">Your Bookings</Typography>
            <Button variant="text" color="primary">
              View All
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeadCell}>Service</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Date & Time</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Bedrooms</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Frequency</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Price</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Status</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.serviceType}</TableCell>
                    <TableCell sx={styles.dateCell}>
                      {formatDate(booking.bookingDate)}
                      <br />
                      <Typography component="span" sx={styles.smallText}>
                        {booking.timeStart} - {booking.timeEnd}
                      </Typography>
                    </TableCell>
                    <TableCell>{booking.bedroomCount}</TableCell>
                    <TableCell>{booking.frequency}</TableCell>
                    <TableCell sx={styles.priceCell}>
                      ${booking.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(booking.status)}
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
