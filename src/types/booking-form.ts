// src/types/booking-form.ts
export interface BookingFormValues {
  service: string;                 // Cleaning service ID
  size: string;                    // Size label (e.g., "Studio", "2 BHK")
  bedrooms: number;               // Number of bedrooms
  extras: Record<string, number>; // e.g., { "fridge": 1, "windows": 2 }
  name: string;
  email: string;
  phone: string;
  address: string;
  pets: string;
  access: string;
  cleanedRecently: string;
  date: string;                   // YYYY-MM-DD
  time: string;                   // Time window (e.g., "10AM-12PM")
  frequency: string;              // e.g., "Weekly", "One-time"
  payment: string;                // e.g., "Cash", "Card"
  subtotal: number;
  gst: number;
  total: number;
}

