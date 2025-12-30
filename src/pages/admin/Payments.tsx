import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { paymentService } from "@/services/payment.service";
import { Payment } from "@/types";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function Payments() {
  const [filters, setFilters] = useState({
    status: "",
    paymentMethod: "",
    bookingId: "",
  });

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.status) cleaned.status = filters.status;
    if (filters.paymentMethod) cleaned.paymentMethod = filters.paymentMethod;
    if (filters.bookingId) cleaned.bookingId = filters.bookingId;
    return cleaned;
  };

  const { data: payments, isLoading, error } = useQuery<Payment[]>({
    queryKey: ["payments", filters],
    queryFn: () => paymentService.getAllPayments(cleanFilters()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading payments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading payments. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<Payment>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Booking ID",
      selector: (row) => row.bookingId,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => `${row.currency} ${row.amount.toFixed(2)}`,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      sortable: true,
      cell: (row) => (
        <span className="capitalize">
          {row.paymentMethod.replace("_", " ")}
        </span>
      ),
    },
    {
      name: "Reference",
      selector: (row) => row.paymentReference || "N/A",
      sortable: false,
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
        <button className="p-2 hover:bg-gray-100 rounded">
          <HiEllipsisVertical className="w-5 h-5 text-gray-600" />
        </button>
      ),
      width: "100px",
      right: true,
      ignoreRowClick: true,
    },
  ];

  const uniqueStatuses = Array.from(
    new Set((payments || []).map((p) => p.status))
  ).sort();
  const uniqueMethods = Array.from(
    new Set((payments || []).map((p) => p.paymentMethod))
  ).sort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">Payments Management</h1>
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
              Payment Method:
            </label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[120px]"
            >
              <option value="">All Methods</option>
              {uniqueMethods.map((method) => (
                <option key={method} value={method}>
                  {method.replace("_", " ").charAt(0).toUpperCase() +
                    method.replace("_", " ").slice(1)}
                </option>
              ))}
            </select>
          </div>
          {(filters.status || filters.paymentMethod || filters.bookingId) && (
            <button
              onClick={() => setFilters({ status: "", paymentMethod: "", bookingId: "" })}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <DataTable
        data={payments || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}

