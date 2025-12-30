import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import {
  HiUsers,
  HiDocumentCheck,
  HiBriefcase,
  HiCalendar,
  HiBuildingOffice,
  HiUser,
} from 'react-icons/hi2'

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  iconBgColor: string
  iconColor: string
}

function MetricCard({ title, value, icon: Icon, iconBgColor, iconColor }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString()
    }
    return val
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1/2 ${iconBgColor} dark:opacity-20 opacity-60`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
        }}
      />
      <div className="relative flex items-center justify-between">
        <div className="flex-1 z-10">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatValue(value)}
          </p>
        </div>
        <div className={`z-10 ${iconBgColor} ${iconColor} w-16 h-16 rounded-full flex items-center justify-center`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: () => dashboardService.getMetrics(),
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading dashboard...</div>
      </div>
    )
  }

  const metricCards = [
    {
      title: 'TOTAL USERS',
      value: metrics?.totalUsers || 0,
      icon: HiUsers,
      iconBgColor: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'ACTIVE USERS',
      value: metrics?.activeUsers || 0,
      icon: HiUser,
      iconBgColor: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'PENDING KYC',
      value: metrics?.pendingKYC || 0,
      icon: HiDocumentCheck,
      iconBgColor: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'SERVICE PROVIDERS',
      value: metrics?.activeServiceProviders || 0,
      icon: HiBriefcase,
      iconBgColor: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'TOTAL BOOKINGS',
      value: metrics?.totalBookings || 0,
      icon: HiCalendar,
      iconBgColor: 'bg-yellow-100 dark:bg-yellow-900',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'TOTAL SERVICE PROVIDERS',
      value: metrics?.totalTenants || 0,
      icon: HiBuildingOffice,
      iconBgColor: 'bg-indigo-100 dark:bg-indigo-900',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metricCards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </div>
  )
}

