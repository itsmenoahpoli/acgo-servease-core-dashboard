import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { roleApi } from '@/lib/api'
import { Role } from '@/types'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function Roles() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: roles, isLoading } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await roleApi.getAll()
      return response.data
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: { name: string; permissions: string[] }) => roleApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      setShowCreateForm(false)
    },
  })

  const handleCreateRole = () => {
    setShowCreateForm(true)
  }

  const handleSubmitCreate = () => {
    createMutation.mutate({ name: 'New Role', permissions: [] })
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading roles...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roles & Permissions</h1>
        <PermissionGuard permission="ROLE_MANAGE">
          <button
            onClick={handleCreateRole}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Role
          </button>
        </PermissionGuard>
      </div>
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Create role form (to be implemented)</p>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitCreate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
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
              <th className="text-left p-2">Permissions</th>
              <th className="text-left p-2">System Role</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role) => (
              <tr key={role.id} className="border-b">
                <td className="p-2">{role.name}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2">{role.isSystem ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

