import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { supportService } from "@/services/support.service";
import { SupportTicket } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function CustomerSupport() {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
  });
  const queryClient = useQueryClient();

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.status) cleaned.status = filters.status;
    if (filters.priority) cleaned.priority = filters.priority;
    if (filters.assignedTo) cleaned.assignedTo = filters.assignedTo;
    return cleaned;
  };

  const { data: tickets, isLoading, error } = useQuery<SupportTicket[]>({
    queryKey: ["support-tickets", filters],
    queryFn: () => supportService.getAllTickets(cleanFilters()),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      supportService.updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading support tickets..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading support tickets. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<SupportTicket>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "User ID",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
      cell: (row) => (
        <StatusBadge
          status={row.priority.toUpperCase()}
          className={
            row.priority === "urgent"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : row.priority === "high"
              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
              : row.priority === "medium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          }
        />
      ),
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo || "Unassigned",
      sortable: true,
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
      cell: (_) => (
        <PermissionGuard permission="SUPPORT_MANAGE">
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
    new Set((tickets || []).map((t) => t.status))
  ).sort();
  const uniquePriorities = Array.from(
    new Set((tickets || []).map((t) => t.priority))
  ).sort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">Customer Support</h1>
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
              Priority:
            </label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[120px]"
            >
              <option value="">All Priorities</option>
              {uniquePriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {(filters.status || filters.priority || filters.assignedTo) && (
            <button
              onClick={() => setFilters({ status: "", priority: "", assignedTo: "" })}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <DataTable
        data={tickets || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}

