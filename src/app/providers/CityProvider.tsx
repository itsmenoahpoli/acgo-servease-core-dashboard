import { ReactNode } from 'react'
import { useAppStore } from '@/store/appStore'

interface CityProviderProps {
  children: ReactNode
}

export function CityProvider({ children }: CityProviderProps) {
  return <>{children}</>
}

export function useCity() {
  const { currentCity, setCurrentCity, cities, setCities } = useAppStore()
  return { currentCity, setCurrentCity, cities, setCities }
}

