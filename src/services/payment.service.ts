import { apiClient } from "@/lib/axios";
import { Payment, PaymentFilters } from "@/types";

export const paymentService = {
  async getAllPayments(filters?: PaymentFilters): Promise<Payment[]> {
    const response = await apiClient.get("/admin/payments", { params: filters });
    return response.data;
  },

  async getPaymentById(id: string): Promise<Payment> {
    const response = await apiClient.get(`/admin/payments/${id}`);
    return response.data;
  },

  async refundPayment(id: string, amount?: number): Promise<void> {
    await apiClient.post(`/admin/payments/${id}/refund`, { amount });
  },
};

