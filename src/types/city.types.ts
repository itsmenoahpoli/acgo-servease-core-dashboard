export interface CreateCityParams {
  name: string;
  enabled?: boolean;
  tenantId?: string;
}

export interface UpdateCityParams {
  id: string;
  name?: string;
  enabled?: boolean;
  tenantId?: string;
}

