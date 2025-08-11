// src/app/Services/customer-service/customer-service.ts

import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import Customer from "../../types/customer"; // or adjust the path if different
import {BookingResponseDto} from "../../types/booking-response-dto"; 
import { UpdateCustomerProfileDto } from "../../types/customer";


export async function getCustomerById(id: string): Promise<Customer> {
  const response = await axios.get(`${API_BASE_URL}/customers/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function getBookingsByCustomerId(id: string): Promise<BookingResponseDto[]> {
  const response = await axios.get(`${API_BASE_URL}/customers/${id}/bookings`, {
    withCredentials: true,
  });
  return response.data;
}

// src/app/Services/customer-service/customer-services.ts

export async function updateCustomer(id: string, updatedData: UpdateCustomerProfileDto): Promise<void> {
  try {
    await axios.put(`${API_BASE_URL}/customers/${id}`, updatedData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Failed to update customer.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
