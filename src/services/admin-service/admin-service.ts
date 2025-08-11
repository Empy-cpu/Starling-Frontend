import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  AdminBooking,
  UpdateBookingAsAdminDto,
  UpdateBookingStatusDto,
} from "@/types/admin-booking";

// 📥 Get all bookings (admin-only)
export async function getAllAdminBookings(): Promise<AdminBooking[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/bookings`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching admin bookings:", error);
    throw error;
  }
}

// 🔁 Update booking status only
export async function updateBookingStatus(
  id: string,
  dto: UpdateBookingStatusDto
): Promise<void> {
  try {
    await axios.patch(`${API_BASE_URL}/admin/bookings/${id}/status`, dto, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    handleAxiosError(error, "Failed to update booking status.");
  }
}

// ✏️ Update full booking as admin (override)
export async function updateBookingAsAdmin(
  id: string,
  dto: UpdateBookingAsAdminDto
): Promise<void> {
  try {
    await axios.put(`${API_BASE_URL}/admin/bookings/${id}`, dto, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    handleAxiosError(error, "Failed to update booking.");
  }
}

// 📄 Get single booking by ID (admin)
export async function getAdminBookingById(id: string): Promise<AdminBooking> {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/bookings/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to fetch booking details.");
  }
}

// 🔧 Shared error handler
function handleAxiosError(error: unknown, fallbackMessage: string): never {
  if (axios.isAxiosError(error)) {
    const message =
      typeof error.response?.data === "string"
        ? error.response.data
        : fallbackMessage;
    throw new Error(message);
  } else {
    throw new Error("An unexpected error occurred.");
  }
}
