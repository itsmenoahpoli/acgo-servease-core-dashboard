import { apiClient } from "@/lib/axios";
import { BlogPost, BlogPostFilters } from "@/types";

export const blogService = {
  async getAllPosts(filters?: BlogPostFilters): Promise<BlogPost[]> {
    const response = await apiClient.get("/admin/blog/posts", { params: filters });
    return response.data;
  },

  async getPostById(id: string): Promise<BlogPost> {
    const response = await apiClient.get(`/admin/blog/posts/${id}`);
    return response.data;
  },

  async createPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    const response = await apiClient.post("/admin/blog/posts", data);
    return response.data;
  },

  async updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiClient.patch(`/admin/blog/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/admin/blog/posts/${id}`);
  },
};

