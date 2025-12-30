import { apiClient } from '../axios'

export const tenantApi = {
  getAll: () => {
    return apiClient.get('/admin/tenants')
  },
  create: (data: { name: string; enabled?: boolean }) => {
    return apiClient.post('/admin/tenants', data)
  },
  update: (id: string, data: { name?: string; enabled?: boolean; adminUserId?: string }) => {
    return apiClient.patch(`/admin/tenants/${id}`, data)
  },
}

