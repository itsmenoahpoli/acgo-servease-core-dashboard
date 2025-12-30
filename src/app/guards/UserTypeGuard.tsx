import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { UserType } from '@/types'

interface UserTypeGuardProps {
  children: ReactNode
  allowedUserTypes: UserType[]
}

export function UserTypeGuard({ children, allowedUserTypes }: UserTypeGuardProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (!allowedUserTypes.includes(user.userType)) {
    return <Navigate to="/access-denied" replace />
  }

  return <>{children}</>
}

