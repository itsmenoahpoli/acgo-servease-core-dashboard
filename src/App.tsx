import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { AuthProvider } from './app/providers/AuthProvider'
import { TenantProvider } from './app/providers/TenantProvider'
import { CityProvider } from './app/providers/CityProvider'
import { adminRoutes } from './app/routes/admin.routes'
import { providerRoutes } from './app/routes/provider.routes'
import { authRoutes } from './app/routes/auth.routes'
import { AuthGuard } from './app/guards/AuthGuard'
import { UserTypeGuard } from './app/guards/UserTypeGuard'
import { AccountStatusGuard } from './app/guards/AccountStatusGuard'
import AccessDenied from './pages/AccessDenied'

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <CityProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/auth/login" replace />} />
              
              {authRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}

              <Route path="/access-denied" element={<AccessDenied />} />

              {adminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AuthGuard>
                      <AccountStatusGuard>
                        <UserTypeGuard allowedUserTypes={['admin']}>
                          {route.element}
                        </UserTypeGuard>
                      </AccountStatusGuard>
                    </AuthGuard>
                  }
                />
              ))}

              {providerRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AuthGuard>
                      <AccountStatusGuard blockedStatuses={['suspended', 'blacklisted']}>
                        <UserTypeGuard allowedUserTypes={['service-provider']}>
                          {route.element}
                        </UserTypeGuard>
                      </AccountStatusGuard>
                    </AuthGuard>
                  }
                />
              ))}

              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          </Suspense>
        </CityProvider>
      </TenantProvider>
    </AuthProvider>
  )
}

export default App

