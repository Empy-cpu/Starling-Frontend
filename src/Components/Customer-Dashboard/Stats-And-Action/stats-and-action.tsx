/* eslint-disable @typescript-eslint/no-explicit-any */
// components/StatsAndActions.tsx
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Add, CalendarToday, Person } from "@mui/icons-material";
import { statsStyles as styles } from "./stats-and-action-styles";

interface Props {
  bookings: any[];
  onEditClick: () => void;
}

export default function StatsAndActions({ bookings, onEditClick }: Props) {
  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const completed = bookings.filter((b) => b.status === "Completed").length;

  return (
    <Box sx={styles.section}>
      <Box sx={styles.statsContainer}>
        <Card sx={styles.statCard}>
          <CardContent>
            <Typography sx={styles.statValue}>{bookings.length}</Typography>
            <Typography sx={styles.statTitle}>Total Bookings</Typography>
          </CardContent>
        </Card>

        <Card sx={styles.statCard}>
          <CardContent>
            <Typography sx={styles.statValue}>{completed}</Typography>
            <Typography sx={styles.statTitle}>Completed</Typography>
          </CardContent>
        </Card>

        <Card sx={styles.statCard}>
          <CardContent>
            <Typography sx={styles.statValue}>
              ${totalSpent.toFixed(0)}
            </Typography>
            <Typography sx={styles.statTitle}>Total Spent</Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={styles.actionsCard}>
        <CardContent>
          <Typography variant="h6" sx={styles.actionTitle}>
            Quick Actions
          </Typography>
          <Box sx={styles.actionsButtons}>
            <Button
              component={Link}
              href="/booking"
              variant="contained"
              startIcon={<Add />}
              sx={styles.primaryButton}
            >
              Book New Service
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarToday />}
              sx={styles.outlinedButton}
            >
              View Calendar
            </Button>
            <Button
              variant="outlined"
              startIcon={<Person />}
              onClick={onEditClick}
              sx={styles.outlinedButton}
            >
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
