import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineClipboardCheck,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineChatAlt2,
  HiOutlineDocumentText,
  HiOutlineSpeakerphone,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { Permissions } from "@/types";

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission: Permissions;
  title: string;
  breadcrumb: string;
}

export interface MenuSection {
  label?: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    items: [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: HiOutlineHome,
        permission: Permissions.USER_READ,
        title: "DASHBOARD",
        breadcrumb: "Analytics",
      },
    ],
  },
  {
    label: "User Management",
    items: [
      {
        path: "/admin/users",
        label: "Users",
        icon: HiOutlineUsers,
        permission: Permissions.USER_READ,
        title: "USERS",
        breadcrumb: "Users",
      },
      {
        path: "/admin/roles",
        label: "Roles & Permissions",
        icon: HiOutlineShieldCheck,
        permission: Permissions.ROLE_MANAGE,
        title: "ROLES & PERMISSIONS",
        breadcrumb: "Roles & Permissions",
      },
      {
        path: "/admin/kyc",
        label: "KYC Review",
        icon: HiOutlineClipboardCheck,
        permission: Permissions.KYC_REVIEW,
        title: "KYC REVIEW",
        breadcrumb: "KYC Review",
      },
    ],
  },
  {
    label: "Business Operations",
    items: [
      {
        path: "/admin/tenants",
        label: "Service Providers",
        icon: HiOutlineOfficeBuilding,
        permission: Permissions.TENANT_MANAGE,
        title: "SERVICE PROVIDERS",
        breadcrumb: "Service Providers",
      },
      {
        path: "/admin/cities",
        label: "Cities",
        icon: HiOutlineLocationMarker,
        permission: Permissions.TENANT_MANAGE,
        title: "CITIES",
        breadcrumb: "Cities",
      },
      {
        path: "/admin/bookings",
        label: "Bookings",
        icon: HiOutlineCalendar,
        permission: Permissions.BOOKING_MANAGE,
        title: "BOOKINGS",
        breadcrumb: "Bookings",
      },
      {
        path: "/admin/transactions",
        label: "Transactions",
        icon: HiOutlineCreditCard,
        permission: Permissions.TRANSACTION_READ,
        title: "TRANSACTIONS",
        breadcrumb: "Transactions",
      },
      {
        path: "/admin/payments",
        label: "Payments",
        icon: HiOutlineCash,
        permission: Permissions.PAYMENT_READ,
        title: "PAYMENTS",
        breadcrumb: "Payments",
      },
    ],
  },
  {
    label: "Support & Communication",
    items: [
      {
        path: "/admin/customer-support",
        label: "Customer Support",
        icon: HiOutlineChatAlt2,
        permission: Permissions.SUPPORT_MANAGE,
        title: "CUSTOMER SUPPORT",
        breadcrumb: "Customer Support",
      },
      {
        path: "/admin/announcements",
        label: "Announcements",
        icon: HiOutlineSpeakerphone,
        permission: Permissions.ANNOUNCEMENT_MANAGE,
        title: "ANNOUNCEMENTS",
        breadcrumb: "Announcements",
      },
    ],
  },
  {
    label: "Content Management",
    items: [
      {
        path: "/admin/cms",
        label: "CMS",
        icon: HiOutlineDocumentText,
        permission: Permissions.CMS_MANAGE,
        title: "CMS",
        breadcrumb: "CMS",
      },
      {
        path: "/admin/blogs",
        label: "Blogs",
        icon: HiOutlineNewspaper,
        permission: Permissions.BLOG_MANAGE,
        title: "BLOGS",
        breadcrumb: "Blogs",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        path: "/admin/security",
        label: "Security",
        icon: HiOutlineLockClosed,
        permission: Permissions.SYSTEM_SECURITY,
        title: "SECURITY",
        breadcrumb: "Security",
      },
      {
        path: "/admin/settings",
        label: "Settings",
        icon: HiOutlineCog,
        permission: Permissions.SYSTEM_SECURITY,
        title: "SETTINGS",
        breadcrumb: "Settings",
      },
    ],
  },
];

export const menuItems: MenuItem[] = menuSections.flatMap(
  (section) => section.items
);

