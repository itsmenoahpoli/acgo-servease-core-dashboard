import { apiClient } from "@/lib/axios";
import { Role } from "@/types";
import { CreateRoleParams, UpdateRoleParams } from "@/types/role.types";

export const roleService = {
  async getAllRoles(): Promise<Role[]> {
    const response = await apiClient.get("/admin/roles");
    return response.data;
  },

  async createRole(data: CreateRoleParams): Promise<Role> {
    const response = await apiClient.post("/admin/roles", data);
    return response.data;
  },

  async updateRole(
    id: string,
    data: Omit<UpdateRoleParams, "id">
  ): Promise<Role> {
    const response = await apiClient.patch(`/admin/roles/${id}`, data);
    return response.data;
  },
};
