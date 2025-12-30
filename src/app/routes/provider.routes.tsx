import { lazy } from 'react'
import { ProviderLayout } from '../layouts/ProviderLayout'

const ProviderDashboard = lazy(() => import('@/pages/provider/Dashboard'))
const Services = lazy(() => import('@/pages/provider/Services'))
const Bookings = lazy(() => import('@/pages/provider/Bookings'))
const Profile = lazy(() => import('@/pages/provider/Profile'))
const KYCStatus = lazy(() => import('@/pages/provider/KYCStatus'))

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

