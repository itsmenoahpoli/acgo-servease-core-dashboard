// Core entity types
export interface User {
  id: string;
  userUid: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "blacklisted";
  tenantId?: string;
  cityId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface KYCSubmission {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  documents: string[];
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  enabled: boolean;
  adminUserId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  enabled: boolean;
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

// Type definitions
export type UserType = "admin" | "service-provider";
export type AdminRole = "super-admin" | "admin" | "support";
export type ServiceProviderAccountType =
  | "service-provider-independent"
  | "service-provider-business";
export type AccountStatus =
  | "active"
  | "suspended"
  | "blacklisted"
  | "pending-kyc";

export interface AuthUser {
  id: string;
  email: string;
  userType: UserType;
  role: string;
  accountType?: ServiceProviderAccountType;
  status: AccountStatus;
  permissions: string[];
  tenantId?: string;
  cityId?: string;
}

// Re-export service types
export * from "./auth.types";
export * from "./user.types";
export * from "./dashboard.types";
export * from "./kyc.types";
export * from "./security.types";
export * from "./role.types";
export * from "./city.types";
export * from "./tenant.types";
export * from "./booking.types";
export * from "./transaction.types";
export * from "./payment.types";
export * from "./support.types";
export * from "./cms.types";
export * from "./announcement.types";
export * from "./blog.types";
export * from "./permissions.types";
