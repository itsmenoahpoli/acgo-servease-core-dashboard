import { apiClient } from "@/lib/axios";
import { User } from "@/types";
import { UserFilters } from "@/types/user.types";

interface ApiUserResponse {
  id: string;
  email: string;
  accountType: string;
  accountStatus: string;
  roleId: string | null;
  role: {
    id: string;
    name: string;
    description: string;
    permissions: Array<{
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  } | null;
  tenantId: string | null;
  cityId: string | null;
  createdAt: string;
  updatedAt: string;
}

const transformApiUserToUser = (data: ApiUserResponse): User => {
  const statusMap: Record<string, "active" | "suspended" | "blacklisted"> = {
    ACTIVE: "active",
    SUSPENDED: "suspended",
    BLACKLISTED: "blacklisted",
  };

  const getRoleName = (): string => {
    if (data.role) {
      return data.role.name;
    }
    if (data.accountType === "admin") {
      return "Admin";
    }
    if (data.accountType === "service-provider-business" || data.accountType === "service-provider-independent") {
      return "Service Provider";
    }
    if (data.accountType === "customer") {
      return "Customer";
    }
    return "User";
  };

  const getName = (): string => {
    const emailPrefix = data.email.split("@")[0];
    return emailPrefix
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return {
    id: data.id,
    userUid: data.id,
    name: getName(),
    email: data.email,
    role: getRoleName(),
    status: statusMap[data.accountStatus] || "active",
    tenantId: data.tenantId || undefined,
    cityId: data.cityId || undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const userService = {
  async getAllUsers(filters?: UserFilters): Promise<User[]> {
    const response = await apiClient.get<ApiUserResponse[]>("/admin/users", { params: filters });
    return response.data.map(transformApiUserToUser);
  },

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiUserResponse>(`/admin/users/${id}`);
    return transformApiUserToUser(response.data);
  },

  async updateUserStatus(id: string, status: string): Promise<void> {
    await apiClient.patch(`/admin/users/${id}/status`, { status });
  },

  async forceUserLogout(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/logout`);
  },
};
