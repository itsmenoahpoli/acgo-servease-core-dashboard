import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './app/providers/AuthProvider'
import { TenantProvider } from './app/providers/TenantProvider'
import { CityProvider } from './app/providers/CityProvider'
import { adminRoutes } from './app/routes/admin.routes'
import { AuthGuard } from './app/guards/AuthGuard'
import { RoleGuard } from './app/guards/RoleGuard'
import Login from './pages/Login'
import AccessDenied from './pages/AccessDenied'

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <CityProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AuthGuard>
                    <RoleGuard requiredRole="admin">
                      {route.element}
                    </RoleGuard>
                  </AuthGuard>
                }
              />
            ))}
          </Routes>
        </CityProvider>
      </TenantProvider>
    </AuthProvider>
  )
}

export default App

