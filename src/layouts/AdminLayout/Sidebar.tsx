import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import brandLogo from "@/assets/brand-logo.jpeg";
import {
  HiOutlineChevronRight,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { menuSections, type MenuSection } from "./constants";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

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
                      key={item.path}
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
                      {isOpen && (
                        <span className="flex-1">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          }

          return (
            <div key={sectionIndex} className="space-y-1">
              {isOpen && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSection(sectionIndex);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 text-xs font-semibold uppercase tracking-wider cursor-pointer",
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
                    <HiOutlineChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <HiOutlineChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )}
                </button>
              )}
              {(!isOpen || isExpanded) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
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
                          marginLeft: isOpen ? "0.5rem" : "0",
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
                        {isOpen && (
                          <span className="flex-1">{item.label}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

