import { lazy } from 'react'
import { AuthLayout } from '../layouts/AuthLayout'

const Login = lazy(() => import('@/pages/Login'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const Register = lazy(() => import('@/pages/Register'))
const VerifyOtp = lazy(() => import('@/pages/VerifyOtp'))

export const authRoutes = [
  {
    path: '/auth/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/auth/verify-otp',
    element: (
      <AuthLayout>
        <VerifyOtp />
      </AuthLayout>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
]

