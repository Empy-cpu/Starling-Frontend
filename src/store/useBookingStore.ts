// Import required dependencies
import { create } from "zustand";
import type { BookingFormValues } from "@/types/booking-form";
import type { CleaningService, Extra } from "@/types/booking-services";
import { calculateBookingPricing, type ExtraBreakdown } from "@/utils/booking-pricing-calculator";
import { getCleaningServices, getExtras } from "@/services/booking-service/booking-service";
import { extrasOptionsAssets } from "@/constants/BookingConstants";

/**
 * Extended booking details that include calculated pricing and a unique identifier
 * Extends the base BookingFormValues with additional fields for the complete booking record
 */
/**
 * Complete pricing breakdown for a booking
 */
export type BookingPricing = {
  baseSubtotal: number;      // Base price of the selected service
  extrasTotal: number;       // Total of all selected extras
  rawSubtotal: number;       // Subtotal before any discounts
  discount: number;          // Discount amount
  subtotalAfterDiscount: number; // Subtotal after applying discount
  total: number;             // Final total
  gst: number;              // GST amount
  extrasBreakdown: ExtraBreakdown[]; // Breakdown of selected extras
};

/**
 * Extended booking details that include calculated pricing and a unique identifier
 * Extends the base BookingFormValues with additional fields for the complete booking record
 */
export interface BookingDetails extends BookingFormValues {
  id: string;           // Unique identifier for the booking
  pricing: BookingPricing; // Complete pricing breakdown
}

/**
 * Type definition for the booking store's state and actions
 */
type BookingStore = {
  // Form state
  formValues: BookingFormValues;  // Current form values
  bookingDetails?: BookingDetails; // Completed booking details
  lastBookingId?: string;         // ID of the most recent booking
  pricing?: BookingPricing;       // Current pricing breakdown

  // Available options
  services: CleaningService[];    // List of available cleaning services
  extrasOptions: (Extra & { image?: string; description?: string })[]; // Available extras with UI assets
  loadingData: boolean;           // Loading state for async operations

  // Actions
  fetchBackendData: () => Promise<void>;  // Fetches services and extras from backend
  updateField: <K extends keyof BookingFormValues>(field: K, value: BookingFormValues[K]) => void; // Updates a form field
  updateExtras: (extraId: string, delta: number) => void; // Updates quantity of an extra service
  setBookingDetails: (details: BookingDetails) => void; // Sets the completed booking details
  setLastBookingId: (id: string) => void; // Updates the last booking ID
  resetForm: () => void; // Resets the form to initial state
  getPricing: () => BookingPricing | undefined; // Returns current pricing breakdown
  recalculatePricing: (formValues: BookingFormValues) => void; // Recalculates pricing based on form values
  validateForm: () => boolean; // Validates the current form values
  getFilteredExtras: () => (Extra & { image?: string; description?: string })[]; // Gets extras filtered by service constraints
};

/**
 * Initial state for the booking form
 * Defines default values for all form fields
 */
const initialState: BookingFormValues = {
  // Service selection
  service: "",          // Selected cleaning service ID
  size: "",             // Property size
  bedrooms: 0,          // Number of bedrooms
  extras: {},           // Selected extras with quantities
  
  // Customer information
  name: "",             // Customer's name
  email: "",            // Customer's email
  phone: "",            // Customer's phone number
  address: "",          // Service address
  
  // Additional information
  pets: "",             // Pets information
  access: "",           // Property access instructions
  cleanedRecently: "",  // Last cleaning date
  
  // Scheduling
  date: "",             // Booking date
  time: "",             // Booking time
  frequency: "",        // Cleaning frequency
  
  // Payment
  payment: "",          // Payment method
  
  // Pricing (calculated)
  subtotal: 0,          // Price before tax
  gst: 0,               // GST amount
  total: 0,             // Total price including GST
};

/**
 * Booking store created with Zustand
 * Manages the state and actions for the booking process
 */
export const useBookingStore = create<BookingStore>()((set, get) => ({
      // Initialize state
      formValues: { ...initialState },  // Form values with defaults
      bookingDetails: undefined,        // Completed booking info
      lastBookingId: undefined,         // Last booking reference
      pricing: undefined,               // Current pricing breakdown

      // Service options (initially empty, populated via fetchBackendData)
      services: [],                     // Available cleaning services
      extrasOptions: [],                // Available extras with UI assets
      loadingData: false,               // Loading state for async operations

      /**
       * Fetches required data from the backend and updates the store
       * Combines backend data with frontend assets
       */
      fetchBackendData: async () => {
        set({ loadingData: true });
        try {
          // Fetch services and extras in parallel
          const [servicesRes, extrasRes] = await Promise.all([
            getCleaningServices(),
            getExtras(),
          ]);

          // Merge backend extras with frontend assets (images, descriptions, constraints, etc.)
          const mergedExtras = extrasRes.map((extra) => {
            const asset = extrasOptionsAssets.find((e) => e.id === extra.id);
            
            // Ensure we have a valid name (required field)
            const getName = () => {
              if (asset?.name) return asset.name;
              if (extra.name) return extra.name;
              if (extra.description) return extra.description;
              return 'Extra Service'; // Fallback name
            };
            
            // Ensure we have a valid price
            const getPrice = () => {
              if (typeof extra.price === 'number') return extra.price;
              if (asset?.price) return asset.price;
              return 0; // Default price
            };
            
            // Create the base merged extra
            const mergedExtra: Extra = {
              ...extra,
              name: getName(),
              description: asset?.description || extra.description || '',
              image: asset?.image || extra.image || '/Images/extras/placeholder.jpeg',
              price: getPrice(),
              // Apply frontend constraints if available
              maxQuantity: asset?.maxQuantity,
              selectionType: asset?.selectionType,
              serviceConstraints: asset?.serviceConstraints,
            };
            
            return mergedExtra;
          });

          // Update store with fetched data
          set({
            services: servicesRes,
            extrasOptions: mergedExtras,
          });
        } catch (err) {
          console.error("Failed to fetch booking data", err);
        } finally {
          set({ loadingData: false });
        }
      },

      /**
       * Updates a form field and triggers price recalculation if needed
       * @param field - The field to update
       * @param value - New value for the field
       */
      updateField: (field, value) => {
        set((state) => {
          // Create updated form values with the new field value
          const updatedFormValues = { ...state.formValues, [field]: value };

          // Always recalculate pricing when any field changes
          const pricing = calculateBookingPricing(
            updatedFormValues,
            state.services,
            state.extrasOptions
          );
          
          // Update form values with new pricing
          return {
            formValues: {
              ...updatedFormValues,
              subtotal: pricing.baseSubtotal,
              gst: pricing.gst,
              total: pricing.total,
            },
            pricing, // Store the full pricing breakdown
          };
        });
      },

      /**
       * Updates the quantity of an extra service and recalculates pricing
       * @param extraId - ID of the extra to update
       * @param delta - Change in quantity (e.g., +1 or -1)
       */
      updateExtras: (extraId, delta) => {
        set((state) => {
          // Get current quantity or default to 0
          const current = state.formValues.extras?.[extraId] || 0;
          
          // Find the extra to check its constraints
          const extra = state.extrasOptions.find(e => e.id === extraId);
          let maxQuantity = Infinity;
          
          if (extra) {
            // Check if there are service-specific constraints
            const serviceConstraint = extra.serviceConstraints?.find(
              sc => sc.serviceId === state.formValues.service
            );
            
            // Get the max quantity from either service-specific or global constraint
            maxQuantity = serviceConstraint?.maxQuantity ?? extra.maxQuantity ?? Infinity;
            
            // If it's a single selection type, max quantity is 1
            const selectionType = serviceConstraint?.selectionType ?? extra.selectionType;
            if (selectionType === 'single') {
              maxQuantity = 1;
            }
          }
          
          // Calculate new quantity, ensuring it respects the max quantity and doesn't go below 0
          let newQuantity = Math.max(current + delta, 0);
          newQuantity = Math.min(newQuantity, maxQuantity);
          
          const updatedExtras = { ...state.formValues.extras };

          // Update or remove the extra based on new quantity
          if (newQuantity === 0) {
            delete updatedExtras[extraId]; // Remove if quantity is 0
          } else {
            updatedExtras[extraId] = newQuantity; // Update quantity
          }

          // Create updated form values with new extras
          const updatedFormValues = { ...state.formValues, extras: updatedExtras };
          
          // Recalculate pricing with updated extras
          const pricing = calculateBookingPricing(
            updatedFormValues,
            state.services,
            state.extrasOptions
          );

          // Return updated state with new pricing
          return {
            formValues: {
              ...updatedFormValues,
              subtotal: pricing.baseSubtotal,
              gst: pricing.gst,
              total: pricing.total,
            },
            pricing, // Store the full pricing breakdown
          };
        });
      },

      /**
       * Sets the completed booking details
       */
      setBookingDetails: (details) => set({ bookingDetails: details }),
      
      /**
       * Updates the last booking ID for reference
       */
      setLastBookingId: (id) => set({ lastBookingId: id }),
      
      /**
       * Resets the form and related state to initial values
       */
      resetForm: () =>
        set({
          formValues: { ...initialState },
          bookingDetails: undefined,
          lastBookingId: undefined,
          pricing: undefined,
        }),
        
      // Selector to get current pricing
      getPricing: (): BookingPricing => {
        const state = get();
        if (!state.pricing) {
          // Calculate pricing if not already in state
          const pricing = calculateBookingPricing(
            state.formValues,
            state.services,
            state.extrasOptions
          );
          // Update the store with the calculated pricing
          set({ pricing });
          return pricing;
        }
        return state.pricing;
      },
      
      // Recalculate pricing based on provided form values
      recalculatePricing: (formValues) => {
        const pricing = calculateBookingPricing(
          formValues,
          get().services,
          get().extrasOptions
        );
        set({ pricing });
        return pricing;
      },
      
      // Validates the current form values
      validateForm: () => {
        const { formValues } = get();
        return !!(formValues.name && formValues.email && formValues.address && 
                 formValues.date && formValues.service);
      },
      
      // Gets extras filtered by service constraints
      getFilteredExtras: () => {
        const { formValues, extrasOptions } = get();
        const isEndOfLease = formValues.service?.toLowerCase().includes('end of lease') || 
                            formValues.service?.toLowerCase().includes('endoflease');
        
        return extrasOptions
          .filter((extra) => {
            if (!formValues.service) return false;
            
            // List of extra IDs to include for End of Lease
            const includedInEol = [
              '56409fda-d9d6-4256-9f06-430a010c0733', // Inside Oven
              '72368950-2455-4e9f-a876-95566f1ab258', // Inside Windows (1-3 bedroom)
              'c5972f4e-6def-4f19-8d15-a1b9a85db67c', // Inside Windows (3+ bedroom)
              'abe8d936-842f-4149-9f5f-34eed0abdcfd', // Wall Cleaning
              '8bb8cf59-7864-420a-a40e-7132278d3057', // Steam Cleaning (small bedroom)
              '97d8d7af-2da3-4a35-8136-3f9ef1ca9182', // Steam Cleaning (living room/large bedroom)
              '9cc1dee5-5d89-48e2-93f6-e7132ea52a2b', // Steam Cleaning (stairway)
              'c631b71c-475e-467e-b7da-2636b8b4a6da'  // Wet Wiping Blinds
            ];
            
            // For End of Lease service, show only explicitly included extras
            if (isEndOfLease) {
              return includedInEol.includes(extra.id);
            }
            
            // List of extra IDs to include for General Cleaning
            const includedInGeneral = [
              'cab74a1d-3eb2-4a5a-8aa1-e44c9328b532', // Spring Clean
              '56409fda-d9d6-4256-9f06-430a010c0733', // Inside Oven
              '2f985e19-259b-4970-9e6c-caab50ebe2ea', // Inside Fridge
              '94191aad-33c4-4f54-969f-0fd2dd30dbae', // Kitchen Cabinets (empty)
              'aecf8bc5-0f51-4131-aa21-95cc44656e94', // Kitchen Cabinets (with contents)
              '3e31ca60-2df9-445c-be5a-af5547a74b3f', // Balcony
              '72368950-2455-4e9f-a876-95566f1ab258', // Inside Windows (1-3 bedroom)
              'c5972f4e-6def-4f19-8d15-a1b9a85db67c', // Inside Windows (3+ bedroom)
              'e1e799eb-1e97-4fee-b873-6e421e9676bd', // Laundry
              'c97315c8-177e-4006-a4d9-6cedf96585e8', // Bed Changing
              'bb80fa10-93b4-4cc3-ac45-0fb9b590b61e', // Ironing
              'abe8d936-842f-4149-9f5f-34eed0abdcfd', // Wall Cleaning
              '8bb8cf59-7864-420a-a40e-7132278d3057', // Steam Cleaning (small bedroom)
              '97d8d7af-2da3-4a35-8136-3f9ef1ca9182', // Steam Cleaning (living room/large bedroom)
              '9cc1dee5-5d89-48e2-93f6-e7132ea52a2b', // Steam Cleaning (stairway)
              '85578db7-004b-4d19-a216-55cd32cd38ae', // Dish Washing
              'c631b71c-475e-467e-b7da-2636b8b4a6da'  // Wet Wiping Blinds
            ];
            
            // For General Cleaning, show only explicitly included extras
            return includedInGeneral.includes(extra.id);
          })
          .map(extra => {
            const serviceConstraint = extra.serviceConstraints?.find(
              constraint => constraint.serviceId === (isEndOfLease ? 'end-of-lease' : 'general-cleaning')
            );
            
            // Apply service constraint if it exists, otherwise use the extra's own properties
            let maxQuantity = serviceConstraint?.maxQuantity ?? extra.maxQuantity ?? 10;
            const selectionType = serviceConstraint?.selectionType ?? extra.selectionType ?? 'multiple';
            
            // Special handling for certain extras
            if (extra.id === '3e31ca60-2df9-445c-be5a-af5547a74b3f' || // Balcony
                extra.id === '2f985e19-259b-4970-9e6c-caab50ebe2ea') { // Inside Fridge
              maxQuantity = 2;
            }
            
            return {
              ...extra,
              maxQuantity: selectionType === 'single' ? 1 : maxQuantity,
              selectionType
            };
          });
      }
    })
);
