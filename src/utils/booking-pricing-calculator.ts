import { FREQUENCY_DISCOUNTS } from "@/constants/BookingConstants";
import type { BookingFormValues } from "@/types/booking-form";
import type { CleaningService, Extra } from "@/types/booking-services";

export interface ExtraBreakdown {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CalculatedPricing {
  baseSubtotal: number;
  extrasTotal: number;
  rawSubtotal: number;
  discount: number;
  subtotalAfterDiscount: number;
  total: number;
  gst: number;
  extrasBreakdown: ExtraBreakdown[];
}

/**
 * Calculate pricing directly from backend's structure
 */
export function calculateBookingPricing(
  values: BookingFormValues,
  services: CleaningService[],
  extrasOptions: Extra[]
): CalculatedPricing {
  // Find selected service
  const selectedService = services.find((svc) => svc.name === values.service);

  // Find matching pricing entry by bedroom count
  // Extract the number from the size string (e.g., '1 Bedroom' -> 1, '2 Bedrooms' -> 2)
  const bedroomCount = values.size ? parseInt(values.size) : 0;
  const selectedPricing = selectedService?.pricing.find(
    (p) => p.bedroomCount === bedroomCount
  );

  const basePrice = selectedPricing?.priceMin || 0;
  const baseSubtotal = basePrice;

  // Extras
  const extrasBreakdown: ExtraBreakdown[] = Object.entries(values.extras || {})
    .filter(([, quantity]) => quantity > 0)
    .map(([extraId, quantity]) => {
      const extra = extrasOptions.find((e) => e.id === extraId);
      const price = extra?.price || 0;
      return {
        name: extra?.name || extraId,
        quantity: quantity as number,
        price,
        total: price * (quantity as number),
      };
    });

  const extrasTotal = extrasBreakdown.reduce((sum, e) => sum + e.total, 0);

  const rawSubtotal = baseSubtotal + extrasTotal;

  // Discount
  const discountRate =
    FREQUENCY_DISCOUNTS[values.frequency as keyof typeof FREQUENCY_DISCOUNTS] ||
    0;
  const discount = parseFloat((rawSubtotal * discountRate).toFixed(2));

  const subtotalAfterDiscount = rawSubtotal - discount;

  // Total amount
  const total = parseFloat(subtotalAfterDiscount.toFixed(2));

  // GST
  const gst = parseFloat((total * 0.1).toFixed(2));

  return {
    baseSubtotal,
    extrasTotal,
    rawSubtotal,
    discount,
    subtotalAfterDiscount,
    total,
    gst,
    extrasBreakdown,
  };
}
