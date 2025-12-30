import { lazy } from 'react'
import { AdminLayout } from '../layouts/AdminLayout'

const Dashboard = lazy(() => import('@/features/admin/dashboard/Dashboard'))
const Users = lazy(() => import('@/features/admin/users/Users'))
const Roles = lazy(() => import('@/features/admin/roles/Roles'))
const KYC = lazy(() => import('@/features/admin/kyc/KYC'))
const Security = lazy(() => import('@/features/admin/security/Security'))
const Tenants = lazy(() => import('@/features/admin/tenants/Tenants'))
const Cities = lazy(() => import('@/features/admin/cities/Cities'))
const Settings = lazy(() => import('@/features/admin/settings/Settings'))

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: (
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminLayout>
        <Users />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/roles',
    element: (
      <AdminLayout>
        <Roles />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/kyc',
    element: (
      <AdminLayout>
        <KYC />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/security',
    element: (
      <AdminLayout>
        <Security />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/tenants',
    element: (
      <AdminLayout>
        <Tenants />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/cities',
    element: (
      <AdminLayout>
        <Cities />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <AdminLayout>
        <Settings />
      </AdminLayout>
    ),
  },
]

