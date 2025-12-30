export interface UserFilters {
  role?: string;
  status?: string;
  tenant?: string;
  city?: string;
}

export interface UpdateUserStatusParams {
  id: string;
  status: string;
}

