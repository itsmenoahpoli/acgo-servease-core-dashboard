import { apiClient } from "@/lib/axios";
import { Tenant } from "@/types";
import { CreateTenantParams, UpdateTenantParams } from "@/types/tenant.types";

export const tenantService = {
  async getAllTenants(): Promise<Tenant[]> {
    const response = await apiClient.get("/admin/tenants");
    return response.data;
  },

  async createTenant(data: CreateTenantParams): Promise<Tenant> {
    const response = await apiClient.post("/admin/tenants", data);
    return response.data;
  },

  async updateTenant(
    id: string,
    data: Omit<UpdateTenantParams, "id">
  ): Promise<Tenant> {
    const response = await apiClient.patch(`/admin/tenants/${id}`, data);
    return response.data;
  },
};
