import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'
import { DashboardMetrics } from '@/types'

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const response = await dashboardApi.getMetrics()
      return response.data
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{metrics?.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending KYC</h3>
          <p className="text-2xl font-bold mt-2">{metrics?.pendingKYC || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Service Providers</h3>
          <p className="text-2xl font-bold mt-2">{metrics?.activeServiceProviders || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold mt-2">{metrics?.totalBookings || 0}</p>
        </div>
      </div>
    </div>
  )
}

