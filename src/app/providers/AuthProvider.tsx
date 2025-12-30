import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return <>{children}</>
}

