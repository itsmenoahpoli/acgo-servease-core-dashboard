import { apiClient } from "@/lib/axios";
import { BlacklistedIP } from "@/types/security.types";

export const securityService = {
  async getBlacklistedIPs(): Promise<BlacklistedIP[]> {
    const response = await apiClient.get("/admin/security/ips");
    return response.data;
  },

  async addBlacklistedIP(ip: string): Promise<void> {
    await apiClient.post("/admin/security/ips", { ip });
  },

  async removeBlacklistedIP(ip: string): Promise<void> {
    await apiClient.delete(`/admin/security/ips/${ip}`);
  },

  async blockEmail(email: string): Promise<void> {
    await apiClient.post("/admin/security/emails", { email });
  },
};
