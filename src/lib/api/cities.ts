import { apiClient } from '../axios'

export const cityApi = {
  getAll: () => {
    return apiClient.get('/admin/cities')
  },
  create: (data: { name: string; enabled?: boolean; tenantId?: string }) => {
    return apiClient.post('/admin/cities', data)
  },
  update: (id: string, data: { name?: string; enabled?: boolean; tenantId?: string }) => {
    return apiClient.patch(`/admin/cities/${id}`, data)
  },
}

