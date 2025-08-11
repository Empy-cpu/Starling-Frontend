
export const stepsForm = [
  "Pick your cleaning service",
  "Enter your details",
  "Select booking date & time",
];

export const times = [
  "7am-9am",
  "9am-11am",
  "11am-1pm",
  "12pm-2pm",
  "1pm-3pm",
  "3pm-5pm",
];


export const cleaningFrequencies = [
  { value: "One time", label: "One time Cleaning" },
  { value: "Weekly", label: "Weekly (10% off)" },
  { value: "Fortnightly", label: "Fortnightly (10% off)" },
  { value: "Three weekly", label: "Three weekly (5% off)" },
  { value: "Four weekly", label: "Four weekly (5% off)" },
];


export const FREQUENCY_DISCOUNTS = {
  "One time": 0,
  "Weekly": 0.1,      // 10% off
  "Fortnightly": 0.1,  // 10% off
  "Three weekly": 0.05, // 5% off
  "Four weekly": 0.05,  // 5% off
} as const;

export const CREDIT_CARD_FEE_PERCENTAGE = 0.0; // 1.5%


export const paymentMethods = [{ value: "Card", label: "Credit/Debit Card" }];

export interface ExtraAsset {
  id: string;
  name?: string; // Optional name, will use description if not provided
  image: string;
  description: string;
  price?: number; // Price for the extra
  // Selection constraints
  maxQuantity?: number; // Maximum allowed quantity (undefined means no limit)
  selectionType?: 'single' | 'multiple' | 'capped'; // Type of selection constraint
  // Service-specific constraints
  serviceConstraints?: {
    serviceId: string; // ID of the service this constraint applies to
    maxQuantity: number; // Override maxQuantity for this specific service
    selectionType?: 'single' | 'multiple' | 'capped'; // Override selectionType for this service
  }[];
}

// Service IDs for reference
const SERVICE_IDS = {
  GENERAL_CLEANING: 'general-cleaning',
  END_OF_LEASE: 'end-of-lease',
  // Add other service IDs as needed
} as const;

export const extrasOptionsAssets: ExtraAsset[] = [
  // General House Cleaning Extras
  {
    id: "cab74a1d-3eb2-4a5a-8aa1-e44c9328b532",
    description: "Deep cleaning of the whole house including hard-to-reach areas.",
    image: "/Images/extras/springclean.png",
    // Only available for General House Cleaning
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.GENERAL_CLEANING,
        maxQuantity: 1,
        selectionType: 'single'
      }
    ]
  },
  {
    id: "56409fda-d9d6-4256-9f06-430a010c0733",
    description: "Thorough cleaning of the inside of your oven.",
    image: "/Images/extras/oven-cleaning.jpeg",
    selectionType: 'single', // One-time only
    maxQuantity: 1,
  },
  {
    id: "2f985e19-259b-4970-9e6c-caab50ebe2ea",
    description: "Remove stains and clean all fridge compartments inside.",
    image: "/Images/extras/inside-fridge.jpeg",
    selectionType: 'capped',
    maxQuantity: 2, // Maximum 2 fridges
  },
  {
    id: "94191aad-33c4-4f54-969f-0fd2dd30dbae",
    description: "Wipe down and clean empty kitchen cabinets.",
    image: "/Images/extras/kitchen-cabinets.jpeg",
    selectionType: 'multiple', // No limit on quantity
  },
  {
    id: "aecf8bc5-0f51-4131-aa21-95cc44656e94",
    description: "Clean inside cabinets with contents present.",
    image: "/Images/extras/kitchen-cabinets.jpeg",
    selectionType: 'multiple', // No limit on quantity
  },
  {
    id: "3e31ca60-2df9-445c-be5a-af5547a74b3f",
    description: "Clean and tidy your balcony area.",
    image: "/Images/extras/balcony.jpeg",
    selectionType: 'capped',
    maxQuantity: 2, // Maximum 2 balconies
  },
  // End of Lease Cleaning Extras
  {
    id: "oven-cleaning-eol",
    name: "Inside Oven",
    description: "Thorough cleaning of the inside of your oven for end of lease.",
    image: "/Images/extras/oven-cleaning.jpeg",
    price: 50, // Example price
    selectionType: 'single',
    maxQuantity: 1,
    // Only available for End of Lease
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 1,
        selectionType: 'single'
      }
    ]
  },
  {
    id: "windows-cleaning-eol-small",
    name: "Inside Windows (1-3 bedroom)",
    description: "Professional cleaning of all inside windows for small homes (1-3 bedrooms).",
    image: "/Images/extras/window-cleaning-inside.jpeg",
    price: 60, // Example price
    selectionType: 'single',
    maxQuantity: 1,
    // Only one of the window cleaning options can be selected
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 1,
        selectionType: 'single'
      }
    ]
  },
  {
    id: "windows-cleaning-eol-large",
    name: "Inside Windows (3+ bedroom)",
    description: "Professional cleaning of all inside windows for larger homes (3+ bedrooms).",
    image: "/Images/extras/window-cleaning-inside.jpeg",
    price: 90, // Example price
    selectionType: 'single',
    maxQuantity: 1,
    // Only one of the window cleaning options can be selected
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 1,
        selectionType: 'single'
      }
    ]
  },
  {
    id: "wall-cleaning-eol",
    name: "Wall Cleaning",
    description: "Professional cleaning of walls and skirting boards.",
    image: "/Images/extras/wall-cleaning.jpeg",
    price: 40, // Example price per room
    selectionType: 'multiple',
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 10, // Example limit
        selectionType: 'multiple'
      }
    ]
  },
  {
    id: "steam-cleaning-eol",
    name: "Steam Cleaning",
    description: "Steam cleaning for small bedroom / Living room / Large bedroom (3m x 4m) / Stairway.",
    image: "/Images/extras/steam-cleaning.jpeg",
    price: 45, // Example price per area
    selectionType: 'multiple',
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 5, // Example limit
        selectionType: 'multiple'
      }
    ]
  },
  {
    id: "wet-wiping-blinds-eol",
    name: "Wet Wiping Blinds",
    description: "Thorough wet wiping of window blinds.",
    image: "/Images/extras/blind-cleaning.jpeg",
    price: 30, // Example price per blind
    selectionType: 'multiple',
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.END_OF_LEASE,
        maxQuantity: 10, // Example limit
        selectionType: 'multiple'
      }
    ]
  },
  {
    id: "e03a99a4-3160-47be-9207-fb3134142942",
    description: "Eco-friendly cleaning product usage.",
    image: "/Images/extras/placeholder.jpeg",
    // Only available for General House Cleaning
    serviceConstraints: [
      {
        serviceId: SERVICE_IDS.GENERAL_CLEANING,
        maxQuantity: 1,
        selectionType: 'single'
      }
    ]
  },
  {
    id: "72368950-2455-4e9f-a876-95566f1ab258",
    description: "Clean all inside windows for small units (1-3 bedrooms).",
    image: "/Images/extras/window-cleaning-inside.jpeg",
    selectionType: 'single',
    maxQuantity: 1,
  },
  {
    id: "c5972f4e-6def-4f19-8d15-a1b9a85db67c",
    description: "Window cleaning for larger homes (3+ bedrooms).",
    image: "/Images/extras/window-cleaning-inside.jpeg",
    selectionType: 'single',
    maxQuantity: 1,
  },
  {
    id: "e1e799eb-1e97-4fee-b873-6e421e9676bd",
    description: "Wash and dry per load of laundry.",
    image: "/Images/extras/laundry.jpeg",
    selectionType: 'multiple', // No limit on quantity
  },
  {
    id: "c97315c8-177e-4006-a4d9-6cedf96585e8",
    description: "Change bed linens and make beds.",
    image: "/Images/extras/bed-changing.jpeg",
    selectionType: 'multiple', // No limit on quantity
  },
  {
    id: "bb80fa10-93b4-4cc3-ac45-0fb9b590b61e",
    description: "Iron clothes for 30 minutes.",
    image: "/Images/extras/ironing.jpeg",
  },
  {
    id: "abe8d936-842f-4149-9f5f-34eed0abdcfd",
    description: "Clean stains and marks from walls.",
    image: "/Images/extras/wall-cleaning.jpeg",
  },
  {
    id: "8bb8cf59-7864-420a-a40e-7132278d3057",
    description: "Steam carpet in a small bedroom.",
    image: "/Images/extras/steam-cleaning.jpeg",
  },
  {
    id: "97d8d7af-2da3-4a35-8136-3f9ef1ca9182",
    description: "Steam large carpeted areas.",
    image: "/Images/extras/steam-cleaning.jpeg",
  },
  {
    id: "9cc1dee5-5d89-48e2-93f6-e7132ea52a2b",
    description: "Steam clean staircases.",
    image: "/Images/extras/steam-cleaning.jpeg",
  },
  {
    id: "85578db7-004b-4d19-a216-55cd32cd38ae",
    description: "Wash all dirty dishes.",
    image: "/Images/extras/dish-washing.jpeg",
  },
  {
    id: "c631b71c-475e-467e-b7da-2636b8b4a6da",
    description: "Wipe and clean all blinds with water.",
    image: "/Images/extras/wet-wipping-blinds.jpeg",
  },
];
