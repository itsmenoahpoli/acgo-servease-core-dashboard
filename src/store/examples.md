# Zustand Store Usage Examples

## Auth Store

```tsx
import { useAuthStore } from '@/store/authStore'

function LoginComponent() {
  const { login, user, isLoading, logout, hasPermission } = useAuthStore()

  const handleLogin = async () => {
    try {
      const user = await login('email@example.com', 'password')
      console.log('Logged in:', user)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout}>Logout</button>
          {hasPermission('USER_READ') && <p>You can read users</p>}
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

## App Store (Tenant & City)

```tsx
import { useAppStore } from '@/store/appStore'
import { useQuery } from '@tanstack/react-query'
import { tenantApi } from '@/lib/api'

function TenantSelector() {
  const { currentTenant, setCurrentTenant, tenants, setTenants } = useAppStore()

  const { data } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const response = await tenantApi.getAll()
      setTenants(response.data)
      return response.data
    },
  })

  return (
    <select
      value={currentTenant?.id || ''}
      onChange={(e) => {
        const tenant = tenants.find((t) => t.id === e.target.value)
        setCurrentTenant(tenant || null)
      }}
    >
      <option value="">Select Tenant</option>
      {tenants.map((tenant) => (
        <option key={tenant.id} value={tenant.id}>
          {tenant.name}
        </option>
      ))}
    </select>
  )
}
```

## UI Store

```tsx
import { useUIStore } from '@/store/uiStore'

function ThemeToggle() {
  const { theme, setTheme, sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      
      <button onClick={toggleSidebar}>
        {sidebarCollapsed ? 'Expand' : 'Collapse'} Sidebar
      </button>
    </div>
  )
}
```

## Combining Multiple Stores

```tsx
import { useAuthStore } from '@/store/authStore'
import { useAppStore } from '@/store/appStore'
import { useUIStore } from '@/store/uiStore'

function DashboardHeader() {
  const { user } = useAuthStore()
  const { currentTenant, currentCity } = useAppStore()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <header>
      <button onClick={toggleSidebar}>☰</button>
      <h1>Welcome, {user?.email}</h1>
      {currentTenant && <span>Tenant: {currentTenant.name}</span>}
      {currentCity && <span>City: {currentCity.name}</span>}
    </header>
  )
}
```

## Persistence

All stores automatically persist to localStorage:
- `auth-storage` - User and token
- `app-storage` - Current tenant and city
- `ui-storage` - Theme and UI preferences

State is automatically restored on page reload!

