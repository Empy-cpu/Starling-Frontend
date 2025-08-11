"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Customer from "@/types/customer";
import {
  getBookingsByCustomerId,
  getCustomerById,
  updateCustomer,
} from "@/services/customer-service/customer-services";
import { getCurrentUser } from "@/services/Auth/auth";
import ProfileCard from "@/Components/Customer-Dashboard/Profile-Card/profile-card";
import StatsAndActions from "@/Components/Customer-Dashboard/Stats-And-Action/stats-and-action";
import BookingsTable from "@/Components/Customer-Dashboard/Booking-Table/booking-table";
import EditProfileDialog from "@/Components/Customer-Dashboard/Edit-Profile-Dialog/edit-profile-dialog";
interface Booking {
  id: string;
  serviceType: string;
  bookingDate: string;
  bedroomCount: number;
  frequency: string;
  totalPrice: number;
  status: string;
}

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        const customerData = await getCustomerById(currentUser.id);
        setCustomer(customerData);
        setEditForm(customerData);
        const bookingsData = await getBookingsByCustomerId(currentUser.id);
        const mappedBookings: Booking[] = bookingsData.map((b) => ({
          id: b.id,
          serviceType: b.serviceName, // Map serviceName → serviceType
          bookingDate: b.bookingDate,
          bedroomCount: b.bedroomCount,
          frequency: b.frequency,
          totalPrice: b.totalPrice,
          status: b.status,
        }));

        setBookings(mappedBookings); // ✅ Correct shape now
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditSave = async () => {
    if (!editForm || !customer) return;

    const updatePayload = {
      name: `${editForm.firstName} ${editForm.lastName}`,
      phone: editForm.phoneNumber ?? undefined,
      address: editForm.address ?? undefined,
      hasPets: editForm.hasPets,
    };

    try {
      await updateCustomer(customer.id, updatePayload);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="h6" color="error">
          Unable to load customer information.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" className="customer-dashboard" sx={{ mt: -4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "flex-start" }}>
        <Box sx={{ flexShrink: 0 }}>
          <ProfileCard
            customer={customer}
            onEditClick={() => setEditDialogOpen(true)}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <StatsAndActions
            bookings={bookings}
            onEditClick={() => setEditDialogOpen(true)}
          />
        </Box>
      </Box>
      <BookingsTable bookings={bookings} />
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        customer={editForm}
        setCustomer={setEditForm}
        onSave={handleEditSave}
      />
    </Container>
  );
}
