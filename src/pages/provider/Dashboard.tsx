import { useQuery } from '@tanstack/react-query'
import {
  HiCalendar,
  HiCurrencyDollar,
  HiStar,
  HiUsers,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
} from 'react-icons/hi2'

interface MetricCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'up' | 'down'
  icon: React.ComponentType<{ className?: string }>
  iconBgColor: string
  iconColor: string
}

function MetricCard({ title, value, change, changeType, icon: Icon, iconBgColor, iconColor }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${iconBgColor} ${iconColor} w-12 h-12 rounded-full flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {changeType === 'up' ? (
          <HiArrowTrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <HiArrowTrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500">vs. previous month</span>
      </div>
    </div>
  )
}

export default function ProviderDashboard() {
  const { isLoading } = useQuery({
    queryKey: ['provider-dashboard'],
    queryFn: async () => {
      return { message: 'Provider Dashboard' }
    },
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Bookings"
          value="28"
          change="16.24%"
          changeType="up"
          icon={HiCalendar}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Revenue"
          value="$2,450"
          change="3.96%"
          changeType="down"
          icon={HiCurrencyDollar}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <MetricCard
          title="Rating"
          value="4.8"
          change="0.24%"
          changeType="up"
          icon={HiStar}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <MetricCard
          title="Active Clients"
          value="45"
          change="7.05%"
          changeType="up"
          icon={HiUsers}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>
    </div>
  )
}

