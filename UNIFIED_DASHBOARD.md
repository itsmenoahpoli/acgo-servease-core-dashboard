# Unified Dashboard Implementation

This document outlines the unified dashboard implementation that supports both Admin and Service Provider users.

## ✅ Completed Implementation

### 1. Types Updated ✓
- Added `UserType`: `'admin' | 'service-provider'`
- Added `AdminRole`: `'super-admin' | 'admin' | 'support'`
- Added `ServiceProviderAccountType`: `'service-provider-independent' | 'service-provider-business'`
- Added `AccountStatus`: `'active' | 'suspended' | 'blacklisted' | 'pending-kyc'`
- Updated `AuthUser` interface to include:
  - `userType: UserType`
  - `accountType?: ServiceProviderAccountType`
  - `status: AccountStatus`

### 2. Auth Store (Zustand) ✓
- `src/store/authStore.ts` handles authentication with userType and accountType
- Login function returns user with userType
- Persisted to localStorage

### 3. Guards Created ✓
- **AuthGuard** (`src/app/guards/AuthGuard.tsx`): Checks if user is authenticated
- **UserTypeGuard** (`src/app/guards/UserTypeGuard.tsx`): Validates user type (admin/service-provider)
- **AccountStatusGuard** (`src/app/guards/AccountStatusGuard.tsx`): Blocks suspended/blacklisted users
- **PermissionGuard** (`src/app/guards/PermissionGuard.tsx`): Checks specific permissions
- **RoleGuard** (`src/app/guards/RoleGuard.tsx`): Validates role (legacy, can be used for admin roles)

### 4. Layouts Created ✓
- **AuthLayout** (`src/app/layouts/AuthLayout.tsx`): Layout for authentication pages
- **AdminLayout** (`src/app/layouts/AdminLayout.tsx`): Layout for admin dashboard with sidebar
- **ProviderLayout** (`src/app/layouts/ProviderLayout.tsx`): Layout for service provider dashboard with sidebar

### 5. Routes Created ✓
- **Auth Routes** (`src/app/routes/auth.routes.tsx`): `/auth/login`
- **Admin Routes** (`src/app/routes/admin.routes.tsx`): All `/admin/*` routes
- **Provider Routes** (`src/app/routes/provider.routes.tsx`): All `/provider/*` routes

### 6. Provider Features Created ✓
- `src/features/provider/dashboard/ProviderDashboard.tsx`
- `src/features/provider/services/Services.tsx`
- `src/features/provider/bookings/Bookings.tsx`
- `src/features/provider/profile/Profile.tsx`
- `src/features/provider/kyc/KYCStatus.tsx`

### 7. App.tsx Updated ✓
- Unified routing with all route types
- Proper guard chain: AuthGuard → AccountStatusGuard → UserTypeGuard
- Lazy loading with Suspense
- Redirects:
  - `/` → `/auth/login`
  - `*` (404) → `/auth/login`

### 8. Login Page Updated ✓
- Route: `/auth/login`
- Post-login redirection based on `userType`:
  - `admin` → `/admin/dashboard`
  - `service-provider` → `/provider/dashboard`
- Error handling for invalid user types

## Route Structure

```
/auth/login                    → Login page (no auth required)
/access-denied                 → Access denied page

/admin/dashboard              → Admin dashboard (requires admin userType)
/admin/users                  → User management
/admin/roles                  → Roles & permissions
/admin/kyc                    → KYC review
/admin/security               → Security management
/admin/tenants                → Tenant management
/admin/cities                 → City management
/admin/settings               → System settings

/provider/dashboard           → Provider dashboard (requires service-provider userType)
/provider/services            → Service provider's services
/provider/bookings            → Provider's bookings
/provider/profile             → Provider profile
/provider/kyc                 → Provider KYC status
```

## Guard Chain

For protected routes:
1. **AuthGuard**: Checks authentication
2. **AccountStatusGuard**: Blocks suspended/blacklisted users
3. **UserTypeGuard**: Validates user type matches route requirements

## Post-Login Flow

```typescript
if (user.userType === 'admin') {
  redirect('/admin/dashboard')
} else if (user.userType === 'service-provider') {
  redirect('/provider/dashboard')
} else {
  show error: 'Invalid user type'
}
```

## Account Status Handling

- **active**: Full access
- **pending-kyc**: Service providers have restricted access (can be customized)
- **suspended**: Blocked (shows account blocked message)
- **blacklisted**: Blocked (shows account blocked message)

## Environment Variables

- `VITE_API_BASE_URL`: Backend API URL (required)

## Next Steps

1. Implement KYC pending restrictions for service providers
2. Add more provider-specific features
3. Enhance admin features
4. Add role-based permission checks within admin routes

