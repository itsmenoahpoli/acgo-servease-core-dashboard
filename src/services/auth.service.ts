import { apiClient } from "@/lib/axios";
import { AuthUser, AccountStatus, UserType } from "@/types";
import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth.types";

interface ApiProfileResponse {
  id: string;
  email: string;
  accountType: string;
  accountStatus: string;
  roleId: string;
  role: {
    id: string;
    name: string;
    description: string;
    permissions: Array<{
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
  tenantId: string | null;
  cityId: string | null;
  createdAt: string;
  updatedAt: string;
}

const transformProfileToAuthUser = (data: ApiProfileResponse): AuthUser => {
  const accountStatusMap: Record<string, AccountStatus> = {
    ACTIVE: "active",
    SUSPENDED: "suspended",
    BLACKLISTED: "blacklisted",
    PENDING_KYC: "pending-kyc",
  };

  const userTypeMap: Record<string, UserType> = {
    admin: "admin",
    "service-provider-independent": "service-provider",
    "service-provider-business": "service-provider",
  };

  const userType: UserType =
    userTypeMap[data.accountType] || "service-provider";

  const status: AccountStatus =
    accountStatusMap[data.accountStatus] || "active";

  const permissions = data.role.permissions.map((p) => p.name);

  return {
    id: data.id,
    email: data.email,
    userType,
    role: data.role.name,
    accountType:
      data.accountType === "admin" ? undefined : (data.accountType as any),
    status,
    permissions,
    tenantId: data.tenantId || undefined,
    cityId: data.cityId || undefined,
  };
};

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post("/auth/signin", { email, password });

    // Only accept 201 status code - means OTP has been sent
    if (response.status !== 201) {
      throw new Error("Unexpected response status. Expected 201.");
    }

    return {
      requiresOtp: true,
      message: response.data.message,
    };
  },

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const response = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
      user?: ApiProfileResponse;
    }>("/auth/signin/verify-otp", data);
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: response.data.user
        ? transformProfileToAuthUser(response.data.user)
        : undefined,
    };
  },

  async getCurrentUser(): Promise<{ user: AuthUser }> {
    const response = await apiClient.get<ApiProfileResponse>("/auth/profile");
    return {
      user: transformProfileToAuthUser(response.data),
    };
  },

  async resendOtp(email: string): Promise<void> {
    await apiClient.post("/auth/resend-otp", { email });
  },

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email });
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post("/auth/register", data);
    return {
      user: response.data.user,
      token: response.data.token,
      message: response.data.message,
    };
  },
};
