import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { transactionService } from "@/services/transaction.service";
import { Transaction } from "@/types";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function Transactions() {
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    userId: "",
  });

  const cleanFilters = () => {
    const cleaned: Record<string, string> = {};
    if (filters.type) cleaned.type = filters.type;
    if (filters.status) cleaned.status = filters.status;
    if (filters.userId) cleaned.userId = filters.userId;
    return cleaned;
  };

  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", filters],
    queryFn: () => transactionService.getAllTransactions(cleanFilters()),
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading transactions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading transactions. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<Transaction>[] = [
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
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      cell: (row) => (
        <StatusBadge
          status={row.type.toUpperCase()}
          className={
            row.type === "payment"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : row.type === "refund"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }
        />
      ),
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
      selector: (row) => row.paymentMethod || "N/A",
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
        <button className="p-2 hover:bg-gray-100 rounded">
          <HiEllipsisVertical className="w-5 h-5 text-gray-600" />
        </button>
      ),
      width: "100px",
      right: true,
      ignoreRowClick: true,
    },
  ];

  const uniqueTypes = Array.from(
    new Set((transactions || []).map((t) => t.type))
  ).sort();
  const uniqueStatuses = Array.from(
    new Set((transactions || []).map((t) => t.status))
  ).sort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">Transactions Management</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Type:
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-w-[120px]"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
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
          {(filters.type || filters.status || filters.userId) && (
            <button
              onClick={() => setFilters({ type: "", status: "", userId: "" })}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <DataTable
        data={transactions || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}

