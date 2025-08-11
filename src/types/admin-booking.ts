export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Paid"
  | "Completed"
  | "Cancelled";

export interface AdminBooking {
  bookingId: string;
  bookingDate: string;
  timeWindow: string;
  frequency: string;
  paymentType: string;
  bedroomCount: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  cleaningServiceName: string;

  // Customer Info
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  guestName?: string;
  guestEmail?: string;
  address: string | null;
  hasPets: boolean;
  entryInstructions: string | null;
  cleanedRecently: boolean;

  extras: {
    name: string;
    quantity: number;
  }[];
}

// ✅ Used to update full booking details (admin override)
export interface UpdateBookingAsAdminDto {
  bookingDate: string;
  timeWindow: string;
  frequency: string;
  paymentType: string;
  bedroomCount: number;
  totalPrice: number;
  status: BookingStatus;
  address: string | null;
  hasPets: boolean;
  entryInstructions: string | null;
  cleanedRecently: boolean;
  extras: {
    name: string;
    quantity: number;
  }[];
}

// ✅ Used to update *only* the status of a booking
export interface UpdateBookingStatusDto {
  status: BookingStatus;
}
