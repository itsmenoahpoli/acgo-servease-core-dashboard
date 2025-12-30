import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/authStore'

interface RoleGuardProps {
  children: ReactNode
  requiredRole: string
}

export function RoleGuard({ children, requiredRole }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/access-denied" replace />
  }

  return <>{children}</>
}

