export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketFilters {
  status?: string;
  priority?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
}

