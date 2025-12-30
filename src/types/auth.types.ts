import { AuthUser } from "./index";

export interface LoginResponse {
  requiresOtp: boolean;
  message?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  user?: AuthUser;
}

export interface RegisterRequest {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  // Service Info
  serviceName: string;
  serviceDescription: string;
  serviceCategory: string;
  hourlyRate: string;
  experience: string;
  // Business Info
  accountType: "service-provider-independent" | "service-provider-business";
  businessName?: string;
  businessRegistrationNumber?: string;
  businessAddress?: string;
  taxId?: string;
}

export interface RegisterResponse {
  user: AuthUser;
  token: string;
  message: string;
}
