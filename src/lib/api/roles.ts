import { apiClient } from '../axios'

export const roleApi = {
  getAll: () => {
    return apiClient.get('/admin/roles')
  },
  create: (data: { name: string; permissions: string[] }) => {
    return apiClient.post('/admin/roles', data)
  },
  update: (id: string, data: { name?: string; permissions?: string[] }) => {
    return apiClient.patch(`/admin/roles/${id}`, data)
  },
}

