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
  baseSubtotal: number;      // Base price of the selected service
  extrasTotal: number;       // Total of all selected extras
  rawSubtotal: number;       // Subtotal before any discounts
  discount: number;          // Total discount amount
  frequencyDiscount: number; // Discount from frequency selection
  firstMonthDiscount: number; // 15% first month discount
  subtotalAfterDiscount: number; // Subtotal after applying all discounts
  total: number;             // Final total
  gst: number;               // GST amount (now set to 0)
  extrasBreakdown: ExtraBreakdown[]; // Breakdown of selected extras
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

  // Step 1: Apply frequency discount
  const frequencyDiscountRate =
    FREQUENCY_DISCOUNTS[values.frequency as keyof typeof FREQUENCY_DISCOUNTS] || 0;
  const frequencyDiscount = parseFloat((rawSubtotal * frequencyDiscountRate).toFixed(2));
  const afterFrequencySubtotal = rawSubtotal - frequencyDiscount;

  // Step 2: Apply first-month discount on already discounted subtotal
  const firstMonthDiscountRate = 0.15; // 15%
  const firstMonthDiscount = parseFloat((afterFrequencySubtotal * firstMonthDiscountRate).toFixed(2));
  const subtotalAfterDiscount = parseFloat((afterFrequencySubtotal - firstMonthDiscount).toFixed(2));

  // Total discount is the sum of both discounts
  const totalDiscount = parseFloat((frequencyDiscount + firstMonthDiscount).toFixed(2));

  const total = subtotalAfterDiscount;

  return {
    baseSubtotal,
    extrasTotal,
    rawSubtotal,
    discount: totalDiscount,
    frequencyDiscount,
    firstMonthDiscount,
    subtotalAfterDiscount,
    total,
    gst: 0, // GST removed as requested
    extrasBreakdown,
  };
}
