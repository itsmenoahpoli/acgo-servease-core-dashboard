import { ReactNode } from 'react'
import { useAppStore } from '@/store/appStore'

interface TenantProviderProps {
  children: ReactNode
}

export function TenantProvider({ children }: TenantProviderProps) {
  return <>{children}</>
}

export function useTenant() {
  const { currentTenant, setCurrentTenant, tenants, setTenants } = useAppStore()
  return { currentTenant, setCurrentTenant, tenants, setTenants }
}

