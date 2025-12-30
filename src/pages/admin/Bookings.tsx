import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { bookingService } from "@/services/booking.service";
import { Booking } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function Bookings() {
  const [filters, setFilters] = useState({
    status: "",
    providerId: "",
    userId: "",
  });
  const queryClient = useQueryClient();

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.status) cleaned.status = filters.status;
    if (filters.providerId) cleaned.providerId = filters.providerId;
    if (filters.userId) cleaned.userId = filters.userId;
    return cleaned;
  };

  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ["bookings", filters],
    queryFn: () => bookingService.getAllBookings(cleanFilters()),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      bookingService.updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading bookings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading bookings. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<Booking>[] = [
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
      name: "Service ID",
      selector: (row) => row.serviceId,
      sortable: true,
    },
    {
      name: "Provider ID",
      selector: (row) => row.providerId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Scheduled Date",
      selector: (row) => row.scheduledDate,
      sortable: true,
      cell: (row) =>
        new Date(row.scheduledDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      sortable: true,
      cell: (row) => `$${row.totalAmount.toFixed(2)}`,
    },
    {
      name: "Action",
      cell: (row) => (
        <PermissionGuard permission="BOOKING_MANAGE">
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
    new Set((bookings || []).map((b) => b.status))
  ).sort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">Bookings Management</h1>
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
          {(filters.status || filters.providerId || filters.userId) && (
            <button
              onClick={() => setFilters({ status: "", providerId: "", userId: "" })}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <DataTable
        data={bookings || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}

