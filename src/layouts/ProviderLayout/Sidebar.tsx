import { Link, useLocation } from "react-router-dom";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { cn } from "@/utils/cn";
import brandLogo from "@/assets/brand-logo.jpeg";
import { HiChevronRight } from "react-icons/hi2";
import { menuItems } from "./constants";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-20"
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
      <div className="px-4 py-3">
        <h2
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          MENU
        </h2>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <PermissionGuard key={item.path} permission={item.permission}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative group",
                  isActive ? "text-white" : "text-white hover:text-white"
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
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.opacity = "0.85";
                  }
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <HiChevronRight
                      className="w-4 h-4"
                      style={{ opacity: 0.7 }}
                    />
                  </>
                )}
              </Link>
            </PermissionGuard>
          );
        })}
      </nav>
    </aside>
  );
}

