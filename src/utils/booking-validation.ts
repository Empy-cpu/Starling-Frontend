import type { BookingFormValues } from '@/types/booking-form';

export type FormErrors = Partial<Record<keyof BookingFormValues, string>>;

const validateEmail = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePhone = (phone: string) => /^\+?\d{10,15}$/.test(phone);

export const validateStep = (step: number, values: BookingFormValues): FormErrors => {
  const errors: FormErrors = {};

  switch (step) {
    case 0: // Service Step
      if (!values.service) errors.service = 'Please select a service.';
      if (!values.size) errors.size = 'Please select a house size.';
      break;

    case 1: // Details Step
      if (!values.name) errors.name = 'Full name is required.';
      if (!values.email) {
        errors.email = 'Email is required.';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Please enter a valid email address.';
      }
      if (!values.phone) {
        errors.phone = 'Phone number is required.';
      } else if (!validatePhone(values.phone)) {
        errors.phone = 'Please enter a valid phone number (10-15 digits).';
      }
      if (!values.address) errors.address = 'Address is required.';
      if (!values.pets) errors.pets = 'Please specify if you have pets.';
      if (!values.cleanedRecently) errors.cleanedRecently = 'Please specify if your home was cleaned recently.';
      break;

    case 2: // Schedule Step
      if (!values.date) errors.date = 'Please select a date.';
      if (!values.time) errors.time = 'Please select a time window.';
      if (values.service !== 'End of Lease Cleaning' && !values.frequency) {
        errors.frequency = 'Please select a frequency.';
      }
      if (!values.payment) errors.payment = 'Please select a payment method.';
      break;
  }

  return errors;
};
