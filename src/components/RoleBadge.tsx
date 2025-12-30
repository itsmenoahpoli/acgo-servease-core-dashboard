import { cn } from '@/utils/cn'

interface RoleBadgeProps {
  role: string
  className?: string
}

const roleColors: Record<string, { bg: string; text: string }> = {
  admin: { bg: 'bg-purple-100', text: 'text-purple-800' },
  'service provider': { bg: 'bg-blue-100', text: 'text-blue-800' },
  customer: { bg: 'bg-green-100', text: 'text-green-800' },
  user: { bg: 'bg-gray-100', text: 'text-gray-800' },
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const normalizedRole = role.toLowerCase()
  const colors = roleColors[normalizedRole] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colors.bg,
        colors.text,
        className
      )}
    >
      {role}
    </span>
  )
}

