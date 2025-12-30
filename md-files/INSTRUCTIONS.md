# Unified Dashboard Application (Admin + Service Provider)

This README defines a **single ReactJS dashboard application** that serves **both Admin users and Service Provider users** using **shared infrastructure** but **role-based routing and layouts**.

The application embeds **Admin Backoffice pages** and **Service Provider Sub-Dashboard pages** within the same codebase.

Routing, layout, and access are determined **after authentication**, based on:

- `userType`
- `accountType`
- `roles & permissions`

---

## 🎯 Core Principle

> **One dashboard application, multiple role-based experiences**

- Single login page
- Shared auth, API, query, and UI infrastructure
- Different route trees and layouts per user type

---

## 👤 Supported User Types

### Admin Users

- `super-admin`
- `admin`
- `support`

### Service Provider Users

- `service-provider-independent`
- `service-provider-business`

❌ Customers / residents are **NOT included** in this dashboard app

---

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Radix UI**
- **TanStack React Query**
- **Axios**
- **React Router v6**
- **React Hook Form + Zod**

---

## 🔐 Authentication Flow

### Login Page

```
/auth/login
```

Single login form for all dashboard users.

---

## 🔁 Post-Login Redirection Logic

After successful authentication:

```ts
if (user.userType === "admin") {
  redirect("/admin");
}

if (user.userType === "service-provider") {
  redirect("/provider");
}
```

### Enforced Conditions

- Invalid user type → access denied
- Suspended / blacklisted → blocked
- Pending KYC (provider) → restricted routes only

---

## 🗂️ Application Structure

```
src/
 ├── app/
 │   ├── routes/
 │   │   ├── admin.routes.tsx
 │   │   ├── provider.routes.tsx
 │   │   └── auth.routes.tsx
 │   ├── layouts/
 │   │   ├── AdminLayout.tsx
 │   │   ├── ProviderLayout.tsx
 │   │   └── AuthLayout.tsx
 │   ├── guards/
 │   │   ├── AuthGuard.tsx
 │   │   ├── UserTypeGuard.tsx
 │   │   ├── AccountStat
```
