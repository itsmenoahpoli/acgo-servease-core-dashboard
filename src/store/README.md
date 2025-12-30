# Zustand Store

This directory contains Zustand stores for global state management with persistence.

## Stores

### `authStore.ts`
Manages authentication state:
- User information
- Auth token
- Login/logout functions
- Permission checking
- Persisted to localStorage as `auth-storage`

### `appStore.ts`
Manages application-wide state:
- Current tenant selection
- Current city selection
- Tenants list
- Cities list
- Persisted to localStorage as `app-storage`

## Usage

```tsx
import { useAuthStore } from '@/store/authStore'
import { useAppStore } from '@/store/appStore'

function MyComponent() {
  const { user, login, logout } = useAuthStore()
  const { currentTenant, setCurrentTenant } = useAppStore()
  
  // Use the state and actions
}
```

## Persistence

Both stores use Zustand's `persist` middleware to automatically save state to localStorage. The state is restored on page reload.

