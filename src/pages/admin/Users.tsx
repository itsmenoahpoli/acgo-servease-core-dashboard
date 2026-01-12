import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { userService } from "@/services/user.service";
import { User } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { RoleBadge } from "@/components/RoleBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useAuth } from "@/store/authStore";

export default function Users() {
  const { user: currentUser } = useAuth();
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    tenant: "",
    city: "",
  });
  const [searchText, setSearchText] = useState("");

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.role) cleaned.role = filters.role;
    if (filters.status) cleaned.status = filters.status;
    if (filters.tenant) cleaned.tenant = filters.tenant;
    if (filters.city) cleaned.city = filters.city;
    return cleaned;
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users", filters],
    queryFn: () => userService.getAllUsers(cleanFilters()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading users..." />
      </div>
    );
  }

  const columns: TableColumn<User>[] = [
    {
      name: "ID",
      selector: (row) => {
        console.log(row);
        return row.userUid;
      },
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => (
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
          {row.email}
        </span>
      ),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => <RoleBadge role={row.role.toUpperCase()} />,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Action",
      cell: (_) => (
        <PermissionGuard permission="USER_WRITE">
          <button className="p-2 hover:bg-gray-100 rounded">
            <HiEllipsisVertical className="w-5 h-5 text-gray-600" />
          </button>
        </PermissionGuard>
      ),
      width: "100px",
      right: true,
      ignoreRowClick: true,
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading users. Please try again.</p>
        </div>
      </div>
    );
  }

  const uniqueRoles = Array.from(
    new Set((users || []).map((u) => u.role))
  ).sort();
  const uniqueStatuses = Array.from(
    new Set((users || []).map((u) => u.status))
  ).sort();

  const filteredUsers = (users || []).filter((user) => {
    if (currentUser && user.id === currentUser.id) return false;
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const matchesSearch =
        user.email.toLowerCase().includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status && user.status !== filters.status) return false;
    return true;
  });

  const customFilters = (
    <>
      <div className="flex items-center gap-2">
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[120px]"
        >
          <option value="">All Roles</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[120px]"
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Clear
          </button>
        )}
      </div>
      {(filters.role || filters.status || searchText) && (
        <button
          onClick={() => {
            setFilters({ role: "", status: "", tenant: "", city: "" });
            setSearchText("");
          }}
          className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
        >
          Clear All
        </button>
      )}
    </>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">{customFilters}</div>
      </div>
      <DataTable
        data={filteredUsers}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows
      />
    </div>
  );
}
