import { apiClient } from '../axios'

export const dashboardApi = {
  getMetrics: () => {
    return apiClient.get('/admin/dashboard/metrics')
  },
  getAlerts: () => {
    return apiClient.get('/admin/dashboard/alerts')
  },
}

