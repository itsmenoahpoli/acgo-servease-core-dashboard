import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tenantApi } from '@/lib/api'
import { Tenant } from '@/types'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function Tenants() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTenantName, setNewTenantName] = useState('')
  const queryClient = useQueryClient()

  const { data: tenants, isLoading } = useQuery<Tenant[]>({
    queryKey: ['tenants'],
    queryFn: async () => {
      const response = await tenantApi.getAll()
      return response.data
    },
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => tenantApi.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
      setShowCreateForm(false)
      setNewTenantName('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      tenantApi.update(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading tenants...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tenant Management</h1>
        <PermissionGuard permission="TENANT_MANAGE">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Tenant
          </button>
        </PermissionGuard>
      </div>
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Create New Tenant</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTenantName}
              onChange={(e) => setNewTenantName(e.target.value)}
              placeholder="Tenant name"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => createMutation.mutate(newTenantName)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setNewTenantName('')
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants?.map((tenant) => (
              <tr key={tenant.id} className="border-b">
                <td className="p-2">{tenant.name}</td>
                <td className="p-2">{tenant.enabled ? 'Enabled' : 'Disabled'}</td>
                <td className="p-2">
                  <PermissionGuard permission="TENANT_MANAGE">
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: tenant.id,
                          enabled: !tenant.enabled,
                        })
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {tenant.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

