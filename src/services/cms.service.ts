import { apiClient } from "@/lib/axios";
import { CMSPage, CMSPageFilters } from "@/types";

export const cmsService = {
  async getAllPages(filters?: CMSPageFilters): Promise<CMSPage[]> {
    const response = await apiClient.get("/admin/cms/pages", { params: filters });
    return response.data;
  },

  async getPageById(id: string): Promise<CMSPage> {
    const response = await apiClient.get(`/admin/cms/pages/${id}`);
    return response.data;
  },

  async createPage(data: Omit<CMSPage, "id" | "createdAt" | "updatedAt">): Promise<CMSPage> {
    const response = await apiClient.post("/admin/cms/pages", data);
    return response.data;
  },

  async updatePage(id: string, data: Partial<CMSPage>): Promise<CMSPage> {
    const response = await apiClient.patch(`/admin/cms/pages/${id}`, data);
    return response.data;
  },

  async deletePage(id: string): Promise<void> {
    await apiClient.delete(`/admin/cms/pages/${id}`);
  },
};

