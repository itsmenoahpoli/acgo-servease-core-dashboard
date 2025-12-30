import { apiClient } from "@/lib/axios";
import { Booking, BookingFilters } from "@/types";

export const bookingService = {
  async getAllBookings(filters?: BookingFilters): Promise<Booking[]> {
    const response = await apiClient.get("/admin/bookings", { params: filters });
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get(`/admin/bookings/${id}`);
    return response.data;
  },

  async updateBookingStatus(id: string, status: string): Promise<void> {
    await apiClient.patch(`/admin/bookings/${id}/status`, { status });
  },

  async cancelBooking(id: string, reason?: string): Promise<void> {
    await apiClient.post(`/admin/bookings/${id}/cancel`, { reason });
  },
};

