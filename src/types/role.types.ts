export interface CreateRoleParams {
  name: string;
  permissions: string[];
}

export interface UpdateRoleParams {
  id: string;
  name?: string;
  permissions?: string[];
}

