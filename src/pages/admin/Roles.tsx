import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { roleService } from "@/services/role.service";
import { Role } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function Roles() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: roles, isLoading, error } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: () => roleService.getAllRoles(),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; permissions: string[] }) =>
      roleService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setShowCreateForm(false);
    },
  });

  const handleCreateRole = () => {
    setShowCreateForm(true);
  };

  const handleSubmitCreate = () => {
    createMutation.mutate({ name: "New Role", permissions: [] });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading roles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading roles. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<Role>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row) => row.permissions.join(", "),
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.map((perm) => (
            <span
              key={perm}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
            >
              {perm}
            </span>
          ))}
        </div>
      ),
    },
    {
      name: "System Role",
      selector: (row) => (row.isSystem ? "Yes" : "No"),
      sortable: true,
      cell: (row) => (
        <StatusBadge
          status={row.isSystem ? "System" : "Custom"}
          className={
            row.isSystem
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }
        />
      ),
    },
    {
      name: "Action",
      cell: (_) => (
        <PermissionGuard permission="ROLE_MANAGE">
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-gray-100">
          Roles & Permissions
        </h1>
        <PermissionGuard permission="ROLE_MANAGE">
          <button
            onClick={handleCreateRole}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
          >
            Create Role
          </button>
        </PermissionGuard>
      </div>
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="mb-4 dark:text-gray-300">
            Create role form (to be implemented)
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleSubmitCreate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <DataTable
        data={roles || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}
