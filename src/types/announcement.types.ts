export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  status: "draft" | "published" | "archived";
  targetAudience?: "all" | "admin" | "provider" | "customer";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementFilters {
  status?: string;
  type?: string;
  targetAudience?: string;
}

