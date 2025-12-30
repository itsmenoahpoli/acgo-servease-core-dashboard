import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/store/authStore";
import { PermissionGuard } from "../guards/PermissionGuard";
import { cn } from "@/utils/cn";
import brandLogo from "@/assets/brand-logo.jpeg";
import {
  HiHome,
  HiUsers,
  HiShieldCheck,
  HiDocumentCheck,
  HiLockClosed,
  HiBuildingOffice,
  HiMapPin,
  HiCog6Tooth,
  HiBars3,
  HiMoon,
  HiSun,
  HiChevronRight,
  HiChevronDown,
  HiCalendar,
  HiCreditCard,
  HiBanknotes,
  HiChatBubbleLeftRight,
  HiDocumentText,
  HiMegaphone,
  HiNewspaper,
} from "react-icons/hi2";
import { useUIStore } from "@/store/uiStore";
import { Permissions } from "@/types";

interface AdminLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission: Permissions;
  title: string;
  breadcrumb: string;
}

interface MenuSection {
  label?: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    items: [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: HiHome,
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
        icon: HiUsers,
        permission: Permissions.USER_READ,
        title: "USERS",
        breadcrumb: "Users",
      },
      {
        path: "/admin/roles",
        label: "Roles & Permissions",
        icon: HiShieldCheck,
        permission: Permissions.ROLE_MANAGE,
        title: "ROLES & PERMISSIONS",
        breadcrumb: "Roles & Permissions",
      },
      {
        path: "/admin/kyc",
        label: "KYC Review",
        icon: HiDocumentCheck,
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
        icon: HiBuildingOffice,
        permission: Permissions.TENANT_MANAGE,
        title: "SERVICE PROVIDERS",
        breadcrumb: "Service Providers",
      },
      {
        path: "/admin/cities",
        label: "Cities",
        icon: HiMapPin,
        permission: Permissions.TENANT_MANAGE,
        title: "CITIES",
        breadcrumb: "Cities",
      },
      {
        path: "/admin/bookings",
        label: "Bookings",
        icon: HiCalendar,
        permission: Permissions.BOOKING_MANAGE,
        title: "BOOKINGS",
        breadcrumb: "Bookings",
      },
      {
        path: "/admin/transactions",
        label: "Transactions",
        icon: HiCreditCard,
        permission: Permissions.TRANSACTION_READ,
        title: "TRANSACTIONS",
        breadcrumb: "Transactions",
      },
      {
        path: "/admin/payments",
        label: "Payments",
        icon: HiBanknotes,
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
        icon: HiChatBubbleLeftRight,
        permission: Permissions.SUPPORT_MANAGE,
        title: "CUSTOMER SUPPORT",
        breadcrumb: "Customer Support",
      },
      {
        path: "/admin/announcements",
        label: "Announcements",
        icon: HiMegaphone,
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
        icon: HiDocumentText,
        permission: Permissions.CMS_MANAGE,
        title: "CMS",
        breadcrumb: "CMS",
      },
      {
        path: "/admin/blogs",
        label: "Blogs",
        icon: HiNewspaper,
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
        icon: HiLockClosed,
        permission: Permissions.SYSTEM_SECURITY,
        title: "SECURITY",
        breadcrumb: "Security",
      },
      {
        path: "/admin/settings",
        label: "Settings",
        icon: HiCog6Tooth,
        permission: Permissions.SYSTEM_SECURITY,
        title: "SETTINGS",
        breadcrumb: "Settings",
      },
    ],
  },
];

const menuItems: MenuItem[] = menuSections.flatMap((section) => section.items);

const getPageTitle = (pathname: string): string => {
  const item = menuItems.find((item) => item.path === pathname);
  return item?.title || "DASHBOARD";
};

const getBreadcrumbs = (pathname: string): string[] => {
  const item = menuItems.find((item) => item.path === pathname);
  if (item) {
    return ["Dashboards", item.breadcrumb];
  }
  return ["Dashboards", "Analytics"];
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useUIStore();

  const getActiveSectionIndex = () => {
    return menuSections.findIndex((section) =>
      section.items.some((item) => item.path === location.pathname)
    );
  };

  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const activeIndex = getActiveSectionIndex();
    const initial = new Set<number>();
    initial.add(0);
    if (activeIndex >= 0) {
      initial.add(activeIndex);
    }
    return initial;
  });

  useEffect(() => {
    const activeIndex = getActiveSectionIndex();
    if (activeIndex >= 0) {
      setExpandedSections((prev) => {
        const next = new Set(prev);
        next.add(activeIndex);
        next.add(0);
        return next;
      });
    }
  }, [location.pathname]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const isSectionExpanded = (index: number) => expandedSections.has(index);
  const hasActiveItem = (section: MenuSection) =>
    section.items.some((item) => item.path === location.pathname);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={cn(
          "flex flex-col transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
        style={{ backgroundColor: "#151529" }}
      >
        <div
          className="py-6 px-4 border-b"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="flex items-center justify-center">
            <img
              src={brandLogo}
              alt="Servease"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto py-4">
          {menuSections.map((section, sectionIndex) => {
            const isExpanded = isSectionExpanded(sectionIndex);
            const sectionHasActiveItem = hasActiveItem(section);
            const isStandalone = !section.label;

            if (isStandalone) {
              return (
                <div key={sectionIndex} className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative group",
                          isActive
                            ? "text-white"
                            : "text-white hover:text-white"
                        )}
                        style={{
                          backgroundColor: isActive
                            ? "rgba(255, 255, 255, 0.2)"
                            : "transparent",
                          opacity: isActive ? 1 : 0.85,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.opacity = "1";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.opacity = "0.85";
                          }
                        }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {isSidebarOpen && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            <HiChevronRight className="w-4 h-4 opacity-70" />
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={sectionIndex} className="space-y-1">
                {isSidebarOpen && (
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 text-xs font-semibold uppercase tracking-wider",
                      sectionHasActiveItem
                        ? "text-white"
                        : "text-white opacity-70 hover:opacity-100"
                    )}
                    style={{
                      backgroundColor: sectionHasActiveItem
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    }}
                  >
                    <span>{section.label}</span>
                    {isExpanded ? (
                      <HiChevronDown className="w-4 h-4 transition-transform duration-200" />
                    ) : (
                      <HiChevronRight className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </button>
                )}
                {(isSidebarOpen ? isExpanded : true) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <PermissionGuard
                          key={item.path}
                          permission={item.permission}
                        >
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative group",
                              isActive
                                ? "text-white"
                                : "text-white hover:text-white"
                            )}
                            style={{
                              backgroundColor: isActive
                                ? "rgba(255, 255, 255, 0.2)"
                                : "transparent",
                              opacity: isActive ? 1 : 0.85,
                              marginLeft: isSidebarOpen ? "0.5rem" : "0",
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.opacity = "1";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.opacity = "0.85";
                              }
                            }}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {isSidebarOpen && (
                              <>
                                <span className="flex-1">{item.label}</span>
                                <HiChevronRight className="w-4 h-4 opacity-70" />
                              </>
                            )}
                          </Link>
                        </PermissionGuard>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <HiBars3 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-1/2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.email?.split("@")[0] || "User"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role || "Admin"}
                </span>
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
                {getBreadcrumbs(location.pathname).map(
                  (crumb, index, array) => (
                    <li key={crumb} className="flex items-center">
                      {index > 0 && (
                        <span className="text-gray-400 dark:text-gray-500 mx-2">
                          ›
                        </span>
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
                  )
                )}
              </ol>
            </nav>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
