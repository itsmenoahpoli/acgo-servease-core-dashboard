import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Breadcrumb } from "./Breadcrumb";
import { Main } from "./Main";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Breadcrumb />
        <Main>{children}</Main>
      </div>
    </div>
  );
}

