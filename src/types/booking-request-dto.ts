// src/types/dto/BookingRequestDto.ts

export interface GuestDto {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  address: string;
  hasPets: boolean;
  cleanedRecently: boolean;
  entryInstructions?: string;
}

export interface BookingRequestDto {
  customerId?: string; // For logged-in users
  guest?: GuestDto;    // For guest bookings
  serviceId: string;
  bedroomCount: number;
  bookingDate: string;  // ISO string
  timeWindow: string;   // e.g., "10AM - 12PM"
  frequency: string;
  paymentType: string;
  Extras: {
    ExtraId: string;
    Quantity: number;
  }[];
  //for the customers
  phone: string;
  address: string;
  hasPets: boolean;
  cleanedRecently: boolean;
  entryInstructions?: string;
}
