"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { AdminBooking } from "@/types/admin-booking";

export interface StatsOverviewProps {
  bookings: AdminBooking[];
}

const StatsOverview = ({ bookings }: StatsOverviewProps) => {
  const stats = [
    { label: "Total Bookings", value: bookings.length },
    {
      label: "Total Revenue",
      value: `Rs ${bookings
        .reduce((acc, b) => acc + b.totalPrice, 0)
        .toFixed(0)}`,
    },
    {
      label: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
    },
    {
      label: "Completed",
      value: bookings.filter((b) => b.status === "Completed").length,
    },
  ];

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      {stats.map((stat) => (
        <Card key={stat.label} sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsOverview;
