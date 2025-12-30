import { apiClient } from "@/lib/axios";
import { Transaction, TransactionFilters } from "@/types";

export const transactionService = {
  async getAllTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    const response = await apiClient.get("/admin/transactions", { params: filters });
    return response.data;
  },

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await apiClient.get(`/admin/transactions/${id}`);
    return response.data;
  },

  async refundTransaction(id: string, amount?: number): Promise<void> {
    await apiClient.post(`/admin/transactions/${id}/refund`, { amount });
  },
};

