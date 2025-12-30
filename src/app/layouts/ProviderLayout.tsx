import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/authStore'
import { PermissionGuard } from '../guards/PermissionGuard'
import { cn } from '@/utils/cn'
import brandLogo from '@/assets/brand-logo.jpeg'
import {
  HiHome,
  HiBriefcase,
  HiCalendar,
  HiUser,
  HiDocumentCheck,
  HiBars3,
  HiMagnifyingGlass,
  HiMoon,
  HiSun,
  HiChevronRight,
} from 'react-icons/hi2'
import { useUIStore } from '@/store/uiStore'

interface ProviderLayoutProps {
  children: ReactNode
}

const menuItems = [
  { path: '/provider/dashboard', label: 'Dashboard', icon: HiHome, permission: 'PROVIDER_READ', title: 'DASHBOARD', breadcrumb: 'Analytics' },
  { path: '/provider/services', label: 'My Services', icon: HiBriefcase, permission: 'SERVICE_MANAGE', title: 'MY SERVICES', breadcrumb: 'My Services' },
  { path: '/provider/bookings', label: 'Bookings', icon: HiCalendar, permission: 'BOOKING_READ', title: 'BOOKINGS', breadcrumb: 'Bookings' },
  { path: '/provider/profile', label: 'Profile', icon: HiUser, permission: 'PROVIDER_READ', title: 'PROFILE', breadcrumb: 'Profile' },
  { path: '/provider/kyc', label: 'KYC Status', icon: HiDocumentCheck, permission: 'PROVIDER_READ', title: 'KYC STATUS', breadcrumb: 'KYC Status' },
]

const getPageTitle = (pathname: string): string => {
  const item = menuItems.find((item) => item.path === pathname)
  return item?.title || 'DASHBOARD'
}

const getBreadcrumbs = (pathname: string): string[] => {
  const item = menuItems.find((item) => item.path === pathname)
  if (item) {
    return ['Dashboards', item.breadcrumb]
  }
  return ['Dashboards', 'Analytics']
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { theme, toggleTheme } = useUIStore()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/login'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={cn(
          "flex flex-col transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
        style={{ backgroundColor: "#151529" }}
      >
        <div className="py-6 px-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
          <div className="flex items-center justify-center">
            <img
              src={brandLogo}
              alt="Servease"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
        <div className="px-4 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            MENU
          </h2>
        </div>
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <PermissionGuard key={item.path} permission={item.permission}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative group",
                    isActive
                      ? "text-white"
                      : "text-white hover:text-white"
                  )}
                  style={{
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    opacity: isActive ? 1 : 0.85,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.opacity = "0.85";
                    }
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      <HiChevronRight className="w-4 h-4" style={{ opacity: 0.7 }} />
                    </>
                  )}
                </Link>
              </PermissionGuard>
            )
          })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiBars3 className="w-5 h-5 text-gray-700" />
            </button>
            <div className="relative flex-1 max-w-md">
              <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <HiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <HiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <div className="flex items-center gap-3 pl-3 ml-3 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
              <div className="w-9 h-9 bg-yellow-100 dark:bg-yellow-900 text-gray-700 dark:text-yellow-200 rounded-full flex items-center justify-center font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.email?.split('@')[0] || 'User'}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Provider'}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase">
              {getPageTitle(location.pathname)}
            </h1>
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                {getBreadcrumbs(location.pathname).map((crumb, index, array) => (
                  <li key={crumb} className="flex items-center">
                    {index > 0 && (
                      <span className="text-gray-400 dark:text-gray-500 mx-2">›</span>
                    )}
                    <span
                      className={
                        index === array.length - 1
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-700 dark:text-gray-300 font-medium"
                      }
                    >
                      {crumb}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

