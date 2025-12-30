export interface CreateTenantParams {
  name: string;
  enabled?: boolean;
}

export interface UpdateTenantParams {
  id: string;
  name?: string;
  enabled?: boolean;
  adminUserId?: string;
}

