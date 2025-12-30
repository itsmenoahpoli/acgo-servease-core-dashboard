import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { securityApi } from '@/lib/api'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function Security() {
  const [newIP, setNewIP] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const queryClient = useQueryClient()

  const { data: blacklistedIPs, isLoading } = useQuery<string[]>({
    queryKey: ['blacklisted-ips'],
    queryFn: async () => {
      const response = await securityApi.getBlacklistedIPs()
      return response.data
    },
  })

  const addIPMutation = useMutation({
    mutationFn: (ip: string) => securityApi.addBlacklistedIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklisted-ips'] })
      setNewIP('')
    },
  })

  const removeIPMutation = useMutation({
    mutationFn: (ip: string) => securityApi.removeBlacklistedIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklisted-ips'] })
    },
  })

  const blockEmailMutation = useMutation({
    mutationFn: (email: string) => securityApi.blockEmail(email),
    onSuccess: () => {
      setNewEmail('')
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading security settings...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Security Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">IP Blacklisting</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                placeholder="Enter IP address"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <PermissionGuard permission="SYSTEM_SECURITY">
                <button
                  onClick={() => addIPMutation.mutate(newIP)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add IP
                </button>
              </PermissionGuard>
            </div>
            <div className="space-y-2">
              {blacklistedIPs?.map((ip) => (
                <div key={ip} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{ip}</span>
                  <PermissionGuard permission="SYSTEM_SECURITY">
                    <button
                      onClick={() => removeIPMutation.mutate(ip)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </PermissionGuard>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Email Blocking</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email or domain"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <PermissionGuard permission="SYSTEM_SECURITY">
                <button
                  onClick={() => blockEmailMutation.mutate(newEmail)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Block
                </button>
              </PermissionGuard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

