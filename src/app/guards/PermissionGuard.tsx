import { ReactNode } from 'react'
import { useAuth } from '@/store/authStore'

interface PermissionGuardProps {
  children: ReactNode
  permission: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, permission, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

