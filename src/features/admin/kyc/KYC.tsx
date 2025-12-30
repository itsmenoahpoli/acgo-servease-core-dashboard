import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { kycApi } from '@/lib/api'
import { KYCSubmission } from '@/types'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function KYC() {
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const queryClient = useQueryClient()

  const { data: submissions, isLoading } = useQuery<KYCSubmission[]>({
    queryKey: ['kyc-submissions'],
    queryFn: async () => {
      const response = await kycApi.getAll({ status: 'pending' })
      return response.data
    },
  })

  const approveMutation = useMutation({
    mutationFn: (id: string) => kycApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kyc-submissions'] })
      setSelectedSubmission(null)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      kycApi.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kyc-submissions'] })
      setSelectedSubmission(null)
      setRejectionReason('')
    },
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading KYC submissions...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">KYC Review</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">User ID</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Submitted At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((submission) => (
              <tr key={submission.id} className="border-b">
                <td className="p-2">{submission.userId}</td>
                <td className="p-2">{submission.status}</td>
                <td className="p-2">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                <td className="p-2">
                  <PermissionGuard permission="KYC_REVIEW">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Review
                      </button>
                    </div>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSubmission && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Review Submission</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Rejection Reason (if rejecting)</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approveMutation.mutate(selectedSubmission.id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setSelectedSubmission(null)
                  setRejectionReason('')
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

