interface Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  hasPets: boolean;
  entryInstructions: string | null;
  cleanedRecently: boolean;
  createdAt: string;
}

export default Customer

export interface UpdateCustomerProfileDto {
  name: string;              // full name ("First Last")
  phone?: string;
  address?: string;
  hasPets: boolean;
}