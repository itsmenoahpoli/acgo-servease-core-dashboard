import { cn } from '@/utils/cn'

interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'custom'
  className?: string
}

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: 'bg-green-100', text: 'text-green-800' },
  suspended: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  blacklisted: { bg: 'bg-red-100', text: 'text-red-800' },
  'pending-kyc': { bg: 'bg-orange-100', text: 'text-orange-800' },
  open: { bg: 'bg-purple-100', text: 'text-purple-800' },
  closed: { bg: 'bg-red-100', text: 'text-red-800' },
  'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'on-hold': { bg: 'bg-blue-100', text: 'text-blue-800' },
  new: { bg: 'bg-green-100', text: 'text-green-800' },
  're-open': { bg: 'bg-blue-100', text: 'text-blue-800' },
  high: { bg: 'bg-red-100', text: 'text-red-800' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-800' },
  low: { bg: 'bg-green-100', text: 'text-green-800' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-')
  const colors = statusColors[normalizedStatus] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colors.bg,
        colors.text,
        className
      )}
    >
      {status}
    </span>
  )
}

