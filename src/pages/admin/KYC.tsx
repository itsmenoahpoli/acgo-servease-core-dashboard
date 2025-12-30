import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { kycService } from "@/services/kyc.service";
import { KYCSubmission } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function KYC() {
  const [selectedSubmission, setSelectedSubmission] =
    useState<KYCSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, error } = useQuery<KYCSubmission[]>({
    queryKey: ["kyc-submissions"],
    queryFn: () => kycService.getSubmissions({ status: "pending" }),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => kycService.approveSubmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc-submissions"] });
      setSelectedSubmission(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      kycService.rejectSubmission(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc-submissions"] });
      setSelectedSubmission(null);
      setRejectionReason("");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading KYC submissions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading KYC submissions. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<KYCSubmission>[] = [
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
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status.toUpperCase()} />,
    },
    {
      name: "Submitted At",
      selector: (row) => row.submittedAt,
      sortable: true,
      cell: (row) =>
        new Date(row.submittedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      name: "Documents",
      selector: (row) => row.documents.length,
      sortable: true,
      cell: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.documents.length} document(s)
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <PermissionGuard permission="KYC_REVIEW">
          <button
            onClick={() => setSelectedSubmission(row)}
            className="p-2 hover:bg-gray-100 rounded"
          >
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
      <h1 className="text-3xl font-bold dark:text-gray-100">KYC Review</h1>
      <DataTable
        data={submissions || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
      {selectedSubmission && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
            Review Submission
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Rejection Reason (if rejecting)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={3}
                placeholder="Enter rejection reason..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approveMutation.mutate(selectedSubmission.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  rejectMutation.mutate({
                    id: selectedSubmission.id,
                    reason: rejectionReason,
                  })
                }
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setSelectedSubmission(null);
                  setRejectionReason("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
