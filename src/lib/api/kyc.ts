import { apiClient } from '../axios'

export const kycApi = {
  getAll: (params?: { status?: string }) => {
    return apiClient.get('/admin/kyc', { params })
  },
  approve: (id: string) => {
    return apiClient.patch(`/admin/kyc/${id}/approve`)
  },
  reject: (id: string, reason: string) => {
    return apiClient.patch(`/admin/kyc/${id}/reject`, { reason })
  },
}

