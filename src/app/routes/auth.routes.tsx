import { lazy } from 'react'
import { AuthLayout } from '../layouts/AuthLayout'

const Login = lazy(() => import('@/pages/Login'))

export const authRoutes = [
  {
    path: '/auth/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
]

