# Servease Backoffice Admin Dashboard

Admin-only dashboard for the Servease Marketplace Platform backend.

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- TanStack React Query
- Axios
- React Router v6
- React Hook Form + Zod

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `VITE_API_BASE_URL` in `.env` to point to your NestJS backend.

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
 ├── app/
 │   ├── routes/          # Route definitions
 │   ├── layouts/         # Layout components
 │   ├── guards/          # Auth, Role, Permission guards
 │   └── providers/       # Context providers
 ├── features/
 │   └── admin/           # Admin feature modules
 ├── components/
 │   ├── ui/              # Reusable UI components
 │   └── admin/           # Admin-specific components
 ├── lib/
 │   ├── api/             # API client functions
 │   ├── axios.ts         # Axios configuration
 │   └── queryClient.ts   # React Query configuration
 ├── types/               # TypeScript types
 └── utils/               # Utility functions
```

## Features

- User Management
- Roles & Permissions
- KYC Review
- Security Management (IP Blacklisting, Email Blocking)
- Tenant Management
- City Management
- System Settings
- Dashboard with metrics

## Authentication

The dashboard requires admin role authentication. All routes are protected by:
- AuthGuard (checks if user is authenticated)
- RoleGuard (checks if user has admin role)
- PermissionGuard (checks specific permissions for UI elements)

## Permissions

Required permissions include:
- `USER_READ`, `USER_WRITE`
- `KYC_REVIEW`
- `ROLE_MANAGE`
- `SYSTEM_SECURITY`
- `TENANT_MANAGE`

