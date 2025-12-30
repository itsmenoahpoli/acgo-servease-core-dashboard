import { apiClient } from "@/lib/axios";
import { Announcement, AnnouncementFilters } from "@/types";

export const announcementService = {
  async getAllAnnouncements(filters?: AnnouncementFilters): Promise<Announcement[]> {
    const response = await apiClient.get("/admin/announcements", { params: filters });
    return response.data;
  },

  async getAnnouncementById(id: string): Promise<Announcement> {
    const response = await apiClient.get(`/admin/announcements/${id}`);
    return response.data;
  },

  async createAnnouncement(data: Omit<Announcement, "id" | "createdAt" | "updatedAt">): Promise<Announcement> {
    const response = await apiClient.post("/admin/announcements", data);
    return response.data;
  },

  async updateAnnouncement(id: string, data: Partial<Announcement>): Promise<Announcement> {
    const response = await apiClient.patch(`/admin/announcements/${id}`, data);
    return response.data;
  },

  async deleteAnnouncement(id: string): Promise<void> {
    await apiClient.delete(`/admin/announcements/${id}`);
  },
};

