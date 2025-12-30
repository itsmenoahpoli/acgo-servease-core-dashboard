import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cityApi } from '@/lib/api'
import { City } from '@/types'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function Cities() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCityName, setNewCityName] = useState('')
  const queryClient = useQueryClient()

  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await cityApi.getAll()
      return response.data
    },
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => cityApi.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] })
      setShowCreateForm(false)
      setNewCityName('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      cityApi.update(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] })
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading cities...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">City Management</h1>
        <PermissionGuard permission="TENANT_MANAGE">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create City
          </button>
        </PermissionGuard>
      </div>
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Create New City</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="City name"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => createMutation.mutate(newCityName)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setNewCityName('')
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
            {cities?.map((city) => (
              <tr key={city.id} className="border-b">
                <td className="p-2">{city.name}</td>
                <td className="p-2">{city.enabled ? 'Enabled' : 'Disabled'}</td>
                <td className="p-2">
                  <PermissionGuard permission="TENANT_MANAGE">
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: city.id,
                          enabled: !city.enabled,
                        })
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {city.enabled ? 'Disable' : 'Enable'}
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

