export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  scheduledDate: string;
  scheduledTime: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilters {
  status?: string;
  providerId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

