import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { PermissionGuard } from '../guards/PermissionGuard'
import { cn } from '@/utils/cn'

interface ProviderLayoutProps {
  children: ReactNode
}

const menuItems = [
  { path: '/provider/dashboard', label: 'Dashboard', permission: 'PROVIDER_READ' },
  { path: '/provider/services', label: 'My Services', permission: 'SERVICE_MANAGE' },
  { path: '/provider/bookings', label: 'Bookings', permission: 'BOOKING_READ' },
  { path: '/provider/profile', label: 'Profile', permission: 'PROVIDER_READ' },
  { path: '/provider/kyc', label: 'KYC Status', permission: 'PROVIDER_READ' },
]

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/login'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Servease Provider</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <PermissionGuard key={item.path} permission={item.permission}>
              <Link
                to={item.path}
                className={cn(
                  'block px-4 py-2 rounded-lg transition-colors',
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            </PermissionGuard>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user?.accountType && (
              <span className="text-sm text-gray-600">
                Account: {user.accountType.replace('service-provider-', '')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

