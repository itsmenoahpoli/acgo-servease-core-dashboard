import { apiClient } from "@/lib/axios";
import { SupportTicket, SupportTicketFilters } from "@/types";

export const supportService = {
  async getAllTickets(filters?: SupportTicketFilters): Promise<SupportTicket[]> {
    const response = await apiClient.get("/admin/support/tickets", { params: filters });
    return response.data;
  },

  async getTicketById(id: string): Promise<SupportTicket> {
    const response = await apiClient.get(`/admin/support/tickets/${id}`);
    return response.data;
  },

  async updateTicketStatus(id: string, status: string): Promise<void> {
    await apiClient.patch(`/admin/support/tickets/${id}/status`, { status });
  },

  async assignTicket(id: string, assignedTo: string): Promise<void> {
    await apiClient.patch(`/admin/support/tickets/${id}/assign`, { assignedTo });
  },

  async updateTicketPriority(id: string, priority: string): Promise<void> {
    await apiClient.patch(`/admin/support/tickets/${id}/priority`, { priority });
  },
};

