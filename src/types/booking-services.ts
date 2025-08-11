export interface CleaningService {
  serviceId: string;
  name: string;
  description: string;
  isAvailable: boolean;
  pricing: ServicePricing[];
}

export interface ServicePricing {
  id?: string; // if you send it from backend
  serviceId: string;
  bedroomCount: number;
  priceMin: number;
  priceMax: number;
}


export interface Extra {
  id: string;
  name: string; // Name of the extra
  price: number; // Price of the extra
  unit?: string; // Unit of measurement (e.g., 'per hour', 'per item')
  description?: string; // Description of the extra
  image?: string; // URL to the extra's image
  // Selection constraints
  maxQuantity?: number; // Maximum allowed quantity (undefined means no limit)
  selectionType?: 'single' | 'multiple' | 'capped'; // Type of selection constraint
  // Optional: Service-specific constraints
  serviceConstraints?: {
    serviceId: string; // ID of the service this constraint applies to
    maxQuantity: number; // Override maxQuantity for this specific service
    selectionType?: 'single' | 'multiple' | 'capped'; // Override selectionType for this service
  }[];
}
