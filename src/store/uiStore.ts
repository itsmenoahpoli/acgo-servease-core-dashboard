import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => {
      const initializeTheme = () => {
        if (typeof window !== "undefined") {
          const storedTheme = get().theme || "light";
          if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      };

      if (typeof window !== "undefined") {
        setTimeout(initializeTheme, 0);
      }

      return {
        theme: "light",
        sidebarCollapsed: false,

        setTheme: (theme: "light" | "dark") => {
          set({ theme });
          if (typeof window !== "undefined") {
            if (theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
        },
        toggleTheme: () => {
          const currentTheme = get().theme;
          const newTheme = currentTheme === "light" ? "dark" : "light";
          set({ theme: newTheme });
          if (typeof window !== "undefined") {
            if (newTheme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
        },
        toggleSidebar: () =>
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        setSidebarCollapsed: (collapsed: boolean) =>
          set({ sidebarCollapsed: collapsed }),
      };
    },
    {
      name: "ui-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          if (state.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
    }
  )
);

