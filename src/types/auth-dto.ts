export interface LoginResponse {
  role: string;
  email: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string; 
}

export interface ResetPasswordRequest  {
  email: string;
  token: string;
  newPassword: string;
};

// types/auth-dto.ts
export interface CurrentUserResponse {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Admin";
  phone?: string;
}
