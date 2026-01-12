import { useLocation } from "react-router-dom";
import { menuItems } from "./constants";

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

export function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase">
          {pageTitle}
        </h1>
        <nav className="flex items-center text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index, array) => (
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
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

