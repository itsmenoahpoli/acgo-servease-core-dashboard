import { useAuth } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { HiOutlineMenu, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useUIStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <HiOutlineMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
            <HiOutlineSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <HiOutlineMoon className="w-5 h-5 text-gray-600" />
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
  );
}

