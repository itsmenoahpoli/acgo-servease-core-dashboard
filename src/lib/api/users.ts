import { apiClient } from '../axios'

export const userApi = {
  getAll: (params?: { role?: string; status?: string; tenant?: string; city?: string }) => {
    return apiClient.get('/admin/users', { params })
  },
  getById: (id: string) => {
    return apiClient.get(`/admin/users/${id}`)
  },
  updateStatus: (id: string, status: string) => {
    return apiClient.patch(`/admin/users/${id}/status`, { status })
  },
  forceLogout: (id: string) => {
    return apiClient.post(`/admin/users/${id}/logout`)
  },
}

