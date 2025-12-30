import { apiClient } from "@/lib/axios";
import { DashboardMetrics, DashboardAlert } from "@/types/dashboard.types";

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get("/admin/dashboard/metrics");
    return response.data;
  },

  async getAlerts(): Promise<DashboardAlert[]> {
    const response = await apiClient.get("/admin/dashboard/alerts");
    return response.data;
  },
};
