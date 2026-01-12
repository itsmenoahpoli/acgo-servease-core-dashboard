import { lazy } from 'react'
import { AdminLayout } from '@/layouts/AdminLayout'

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const Users = lazy(() => import('@/pages/admin/Users'))
const Roles = lazy(() => import('@/pages/admin/Roles'))
const KYC = lazy(() => import('@/pages/admin/KYC'))
const Security = lazy(() => import('@/pages/admin/Security'))
const Tenants = lazy(() => import('@/pages/admin/Tenants'))
const Cities = lazy(() => import('@/pages/admin/Cities'))
const Bookings = lazy(() => import('@/pages/admin/Bookings'))
const Transactions = lazy(() => import('@/pages/admin/Transactions'))
const Payments = lazy(() => import('@/pages/admin/Payments'))
const CustomerSupport = lazy(() => import('@/pages/admin/CustomerSupport'))
const CMS = lazy(() => import('@/pages/admin/CMS'))
const Announcements = lazy(() => import('@/pages/admin/Announcements'))
const Blogs = lazy(() => import('@/pages/admin/Blogs'))
const Settings = lazy(() => import('@/pages/admin/Settings'))

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
    path: '/admin/bookings',
    element: (
      <AdminLayout>
        <Bookings />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/transactions',
    element: (
      <AdminLayout>
        <Transactions />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/payments',
    element: (
      <AdminLayout>
        <Payments />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/customer-support',
    element: (
      <AdminLayout>
        <CustomerSupport />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/cms',
    element: (
      <AdminLayout>
        <CMS />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/announcements',
    element: (
      <AdminLayout>
        <Announcements />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/blogs',
    element: (
      <AdminLayout>
        <Blogs />
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

