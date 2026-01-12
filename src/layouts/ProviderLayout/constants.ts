import {
  HiHome,
  HiBriefcase,
  HiCalendar,
  HiUser,
  HiDocumentCheck,
} from "react-icons/hi2";

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission: string;
  title: string;
  breadcrumb: string;
}

export const menuItems: MenuItem[] = [
  {
    path: "/provider/dashboard",
    label: "Dashboard",
    icon: HiHome,
    permission: "PROVIDER_READ",
    title: "DASHBOARD",
    breadcrumb: "Analytics",
  },
  {
    path: "/provider/services",
    label: "My Services",
    icon: HiBriefcase,
    permission: "SERVICE_MANAGE",
    title: "MY SERVICES",
    breadcrumb: "My Services",
  },
  {
    path: "/provider/bookings",
    label: "Bookings",
    icon: HiCalendar,
    permission: "BOOKING_READ",
    title: "BOOKINGS",
    breadcrumb: "Bookings",
  },
  {
    path: "/provider/profile",
    label: "Profile",
    icon: HiUser,
    permission: "PROVIDER_READ",
    title: "PROFILE",
    breadcrumb: "Profile",
  },
  {
    path: "/provider/kyc",
    label: "KYC Status",
    icon: HiDocumentCheck,
    permission: "PROVIDER_READ",
    title: "KYC STATUS",
    breadcrumb: "KYC Status",
  },
];

