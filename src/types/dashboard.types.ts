export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  pendingKYC: number;
  totalTenants: number;
  activeServiceProviders: number;
  totalBookings: number;
}

export interface DashboardAlert {
  id: string;
  type: string;
  message: string;
  severity: "low" | "medium" | "high";
  createdAt: string;
}

