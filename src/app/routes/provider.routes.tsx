import { lazy } from 'react'
import { ProviderLayout } from '../layouts/ProviderLayout'

const ProviderDashboard = lazy(() => import('@/features/provider/dashboard/ProviderDashboard'))
const Services = lazy(() => import('@/features/provider/services/Services'))
const Bookings = lazy(() => import('@/features/provider/bookings/Bookings'))
const Profile = lazy(() => import('@/features/provider/profile/Profile'))
const KYCStatus = lazy(() => import('@/features/provider/kyc/KYCStatus'))

export const providerRoutes = [
  {
    path: '/provider/dashboard',
    element: (
      <ProviderLayout>
        <ProviderDashboard />
      </ProviderLayout>
    ),
  },
  {
    path: '/provider/services',
    element: (
      <ProviderLayout>
        <Services />
      </ProviderLayout>
    ),
  },
  {
    path: '/provider/bookings',
    element: (
      <ProviderLayout>
        <Bookings />
      </ProviderLayout>
    ),
  },
  {
    path: '/provider/profile',
    element: (
      <ProviderLayout>
        <Profile />
      </ProviderLayout>
    ),
  },
  {
    path: '/provider/kyc',
    element: (
      <ProviderLayout>
        <KYCStatus />
      </ProviderLayout>
    ),
  },
]

