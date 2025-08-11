import { create } from "zustand";
import {
  AdminBooking,
  UpdateBookingAsAdminDto,
  UpdateBookingStatusDto,
} from "@/types/admin-booking";
import {
  getAllAdminBookings,
  updateBookingStatus as apiUpdateStatus,
  updateBookingAsAdmin as apiUpdateBooking,
} from "@/services/admin-service/admin-service";

interface AdminBookingStore {
  bookings: AdminBooking[];
  setBookings: (bookings: AdminBooking[]) => void;
  fetchBookings: () => Promise<void>;
  updateBookingStatus: (
    id: string,
    dto: UpdateBookingStatusDto
  ) => Promise<void>;
  updateBookingAsAdmin: (
    id: string,
    dto: UpdateBookingAsAdminDto
  ) => Promise<void>;
}

export const useAdminBookingStore = create<AdminBookingStore>((set, get) => ({
  bookings: [],

  setBookings: (bookings) => {
    console.log("✅ setBookings called with:", bookings);
    set({ bookings });
  },

  fetchBookings: async () => {
    try {
      console.log("📡 Fetching admin bookings...");
      const bookings = await getAllAdminBookings();
      console.log("✅ Fetched bookings:", bookings);
      set({ bookings });
    } catch (error) {
      console.error("❌ Failed to fetch admin bookings:", error);
    }
  },

  updateBookingStatus: async (id, dto) => {
    try {
      console.log(`🛠 Updating status for booking ${id}...`);
      await apiUpdateStatus(id, dto);
      // Optional: Refresh after update
      await get().fetchBookings();
    } catch (error) {
      console.error("❌ Failed to update booking status:", error);
    }
  },

  updateBookingAsAdmin: async (id, dto) => {
    try {
      console.log(`🛠 Admin editing booking ${id}...`);
      await apiUpdateBooking(id, dto);
      // Optional: Refresh after update
      await get().fetchBookings();
    } catch (error) {
      console.error("❌ Failed to update booking as admin:", error);
    }
  },
}));
