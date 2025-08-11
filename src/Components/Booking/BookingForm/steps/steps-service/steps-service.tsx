"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Tooltip,
  FormLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { BookingFormValues } from "@/types/booking-form";
import { useBookingStore } from "@/store/useBookingStore";
import type { ServicePricing, CleaningService } from "@/types/booking-services";
import "./steps-service.css";

interface StepServiceProps {
  formValues: BookingFormValues;
  onChange: <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => void;
  onUpdateExtra: (key: string, delta: number) => void;
  availableServices: CleaningService[];
}

const StepService: React.FC<StepServiceProps> = ({
  formValues,
  onChange,
  onUpdateExtra,
  availableServices,
}) => {
  const { getFilteredExtras } = useBookingStore();

  // Handle service change
  const handleServiceChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newService = e.target.value as string;
    // Reset extras when service changes
    if (newService !== formValues.service) {
      onChange("extras", {});
    }
    onChange("service", newService);
  };

  // Get filtered extras from the store
  const filteredExtras = getFilteredExtras();

  return (
    <Box className="step-service">
      {/* Cleaning Service */}
      <TextField
        select
        label="Cleaning Service"
        fullWidth
        value={formValues.service}
        onChange={handleServiceChange}
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
        sx={{ mb: 3 }}
      >
        {availableServices.map((service: CleaningService) => (
          <MenuItem key={service.serviceId} value={service.name}>
            {service.name}
          </MenuItem>
        ))}
      </TextField>

     
      {/* House Size */}
      <TextField
        select
        fullWidth
        label="Size of your house"
        value={formValues.size || ''}
        onChange={(e) => onChange("size", e.target.value as string)}
        SelectProps={{ 
          MenuProps: { 
            disableScrollLock: true,
            style: { zIndex: 1301 } // Ensure dropdown appears above other elements
          } 
        }}
        sx={{ mb: 2 }}
        disabled={!formValues.service}
      >
        {(() => {
          // Get the selected service
          const selectedService = availableServices.find(svc => svc.name === formValues.service);
          if (!selectedService || !selectedService.pricing?.length) {
            return (
              <MenuItem disabled value="">
                No sizes available for this service
              </MenuItem>
            );
          }
          
          // Create a map to deduplicate by bedroom count
          const uniquePricing = new Map<number, ServicePricing>();
          
          // Add each pricing to the map, keeping the first occurrence of each bedroom count
          selectedService.pricing.forEach((p: ServicePricing) => {
            if (!uniquePricing.has(p.bedroomCount)) {
              uniquePricing.set(p.bedroomCount, p);
            }
          });
          
          // Convert map values to array and sort by bedroom count
          return Array.from(uniquePricing.values())
            .sort((a, b) => a.bedroomCount - b.bedroomCount)
            .map((p) => {
              const displayText = `${p.bedroomCount} Bedroom${p.bedroomCount > 1 ? 's' : ''} — $${p.priceMin}`;
              const value = `${p.bedroomCount} Bedroom${p.bedroomCount > 1 ? 's' : ''}`;
              
              return (
                <MenuItem 
                  key={p.bedroomCount} 
                  value={value}
                >
                  {displayText}
                </MenuItem>
              );
            });
        })()}
      </TextField>

      {/* Extras */}
      <FormLabel className="booking-form-label">Select Extras</FormLabel>
      <Box className="extras-grid" sx={{ display: "grid !important" }}>
        {filteredExtras.length > 0 ? (
          filteredExtras.map((extra) => (
            <Tooltip key={extra.id} title={extra.description || ""} arrow>
              <Box className="extra-card">
                <Image
                  src={extra.image || "/Images/extras/placeholder.jpeg"}
                  alt={extra.name}
                  className="extra-image"
                  width={80}
                  height={80}
                />
                <Box className="quantity-controls">
                  <IconButton
                    size="small"
                    onClick={() => onUpdateExtra(extra.id, -1)}
                    disabled={!formValues.extras?.[extra.id]}
                    data-testid={`remove-${extra.id}`}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span className="quantity">
                    {formValues.extras?.[extra.id] || 0}
                  </span>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateExtra(extra.id, 1)}
                    disabled={
                      !!(extra.maxQuantity !== undefined && 
                        extra.maxQuantity <= (formValues.extras?.[extra.id] || 0))
                    }
                    data-testid={`add-${extra.id}`}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <div className="extra-label">{extra.name}</div>
                <Typography className="extra-price">{`$${extra.price}${
                  extra.unit ? ` / ${extra.unit}` : ""
                }`}</Typography>
              </Box>
            </Tooltip>
          ))
        ) : (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {formValues.service 
                ? `No extras available for ${formValues.service}`
                : 'Select a service to see available extras'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StepService;
