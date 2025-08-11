export interface BookingResponseDto {
  id: string;
  customerName: string;
  guestName?: string;
  guestEmail?: string;
  serviceName: string;
  bedroomCount: number;
  bookingDate: string;
  timeWindow: string;
  frequency: string;
  paymentType: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  extras: string[];
}
