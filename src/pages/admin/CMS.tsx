import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { cmsService } from "@/services/cms.service";
import { CMSPage } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical, HiPlus } from "react-icons/hi2";

export default function CMS() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const queryClient = useQueryClient();

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.status) cleaned.status = filters.status;
    if (filters.search) cleaned.search = filters.search;
    return cleaned;
  };

  const { data: pages, isLoading, error } = useQuery<CMSPage[]>({
    queryKey: ["cms-pages", filters],
    queryFn: () => cmsService.getAllPages(cleanFilters()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cmsService.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading CMS pages..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading CMS pages. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<CMSPage>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      cell: (row) => (
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
          /{row.slug}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      name: "Action",
      cell: (row) => (
        <PermissionGuard permission="CMS_MANAGE">
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

  const uniqueStatuses = Array.from(
    new Set((pages || []).map((p) => p.status))
  ).sort();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-gray-100">CMS Management</h1>
        <PermissionGuard permission="CMS_MANAGE">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium flex items-center gap-2"
          >
            <HiPlus className="w-4 h-4" />
            Create Page
          </button>
        </PermissionGuard>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Status:
            </label>
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
            <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search pages..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          {(filters.status || filters.search) && (
            <button
              onClick={() => setFilters({ status: "", search: "" })}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <DataTable
        data={pages || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}

