import { apiClient } from "@/lib/axios";
import { KYCSubmission } from "@/types";
import { KYCFilters } from "@/types/kyc.types";

export const kycService = {
  async getSubmissions(filters?: KYCFilters): Promise<KYCSubmission[]> {
    const response = await apiClient.get("/admin/kyc", { params: filters });
    return response.data;
  },

  async approveSubmission(id: string): Promise<void> {
    await apiClient.patch(`/admin/kyc/${id}/approve`);
  },

  async rejectSubmission(id: string, reason: string): Promise<void> {
    await apiClient.patch(`/admin/kyc/${id}/reject`, { reason });
  },
};
