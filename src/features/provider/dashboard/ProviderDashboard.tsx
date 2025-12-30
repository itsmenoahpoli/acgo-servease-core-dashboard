import { useQuery } from '@tanstack/react-query'

export default function ProviderDashboard() {
  const { isLoading } = useQuery({
    queryKey: ['provider-dashboard'],
    queryFn: async () => {
      return { message: 'Provider Dashboard' }
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Provider Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Welcome to your provider dashboard</p>
      </div>
    </div>
  )
}

