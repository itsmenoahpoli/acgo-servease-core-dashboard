export interface User {
  id: string
  email: string
  role: string
  status: 'active' | 'suspended' | 'blacklisted'
  tenantId?: string
  cityId?: string
  createdAt: string
  updatedAt: string
}

export interface Role {
  id: string
  name: string
  permissions: string[]
  isSystem: boolean
  createdAt: string
  updatedAt: string
}

export interface Permission {
  id: string
  name: string
  description?: string
}

export interface KYCSubmission {
  id: string
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  documents: string[]
  rejectionReason?: string
  submittedAt: string
  reviewedAt?: string
}

export interface Tenant {
  id: string
  name: string
  enabled: boolean
  adminUserId?: string
  createdAt: string
  updatedAt: string
}

export interface City {
  id: string
  name: string
  enabled: boolean
  tenantId?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardMetrics {
  totalUsers: number
  usersByRole: Record<string, number>
  pendingKYC: number
  activeServiceProviders: number
  totalServices: number
  totalBookings: number
}

export type UserType = 'admin' | 'service-provider'
export type AdminRole = 'super-admin' | 'admin' | 'support'
export type ServiceProviderAccountType = 'service-provider-independent' | 'service-provider-business'
export type AccountStatus = 'active' | 'suspended' | 'blacklisted' | 'pending-kyc'

export interface AuthUser {
  id: string
  email: string
  userType: UserType
  role: string
  accountType?: ServiceProviderAccountType
  status: AccountStatus
  permissions: string[]
  tenantId?: string
  cityId?: string
}

