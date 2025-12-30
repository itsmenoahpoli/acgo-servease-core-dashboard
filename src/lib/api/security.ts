import { apiClient } from '../axios'

export const securityApi = {
  getBlacklistedIPs: () => {
    return apiClient.get('/admin/security/ips')
  },
  addBlacklistedIP: (ip: string) => {
    return apiClient.post('/admin/security/ips', { ip })
  },
  removeBlacklistedIP: (ip: string) => {
    return apiClient.delete(`/admin/security/ips/${ip}`)
  },
  blockEmail: (email: string) => {
    return apiClient.post('/admin/security/emails', { email })
  },
}

