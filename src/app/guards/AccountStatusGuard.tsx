import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { AccountStatus } from '@/types'

interface AccountStatusGuardProps {
  children: ReactNode
  blockedStatuses?: AccountStatus[]
}

export function AccountStatusGuard({ children, blockedStatuses = ['suspended', 'blacklisted'] }: AccountStatusGuardProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (blockedStatuses.includes(user.status)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Blocked</h1>
          <p className="text-gray-600 mb-8">
            Your account has been {user.status}. Please contact support.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

