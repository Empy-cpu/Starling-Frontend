import axios from "axios";
import https from "https";
import { API_BASE_URL } from "@/config/apiConfig";
import { BookingRequestDto } from "@/types/booking-request-dto";
import { BookingResponseDto } from "@/types/booking-response-dto";
import {
  CleaningService,
  ServicePricing,
  Extra,
} from "@/types/booking-services";

// ---- Get All Cleaning Services ----
export async function getCleaningServices(): Promise<CleaningService[]> {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await axios.get<CleaningService[]>(
      `${API_BASE_URL}/services`, // backend route for cleaning services
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        httpsAgent: process.env.NODE_ENV === "development" ? agent : undefined,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cleaning services:", error);
    throw new Error("Failed to fetch cleaning services");
  }
}
// ---- Get All Service Pricing ----
export async function getServicePricing(): Promise<ServicePricing[]> {
  try {
    const response = await axios.get<ServicePricing[]>(
      `${API_BASE_URL}/pricing`, // backend route for pricing
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching service pricing:", error);
    throw new Error("Failed to fetch service pricing");
  }
}
export async function getExtras(): Promise<Extra[]> {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await axios.get<Extra[]>(
      `${API_BASE_URL}/extras`, // backend route for pricing
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        httpsAgent: process.env.NODE_ENV === "development" ? agent : undefined,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching extras:", error);
    throw new Error("Failed to fetch extras");
  }
}
// ---- Create Booking ----
export async function createCustomerBooking(
  data: BookingRequestDto
): Promise<string> {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}/bookings/customer`, // backend route for creating customer booking
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // send cookies (HTTP-only JWT)
      }
    );
    return response.data; // booking ID or success message
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Booking failed. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function createGuestBooking(
  data: BookingRequestDto
): Promise<string> {
  try {
    const response = await axios.post<string>(
      `${API_BASE_URL}/bookings/guest`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // send cookies (HTTP-only JWT)
      }
    );
    return response.data; // booking ID or success message
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Booking failed. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// ---- Get Booking by ID ----
export async function getBookingById(id: string): Promise<BookingResponseDto> {
  try {
    const response = await axios.get<BookingResponseDto>(
      `${API_BASE_URL}/bookings/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Failed to fetch booking.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

