"use client";

import { useEffect } from "react";
import StatsOverview from "@/Components/admin/stats-overview";
import { useAdminBookingStore } from "@/store/admin-booking-store";
import BookingTable from "@/Components/admin/booking-table";

export default function AdminDashboardPage() {
  const { bookings, fetchBookings } = useAdminBookingStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div>
      <StatsOverview bookings={bookings} />
      <BookingTable bookings={bookings} />
    </div>
  );
}
