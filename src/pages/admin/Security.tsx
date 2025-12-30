import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { securityService } from "@/services/security.service";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { Spinner } from "@/components/Spinner";

export default function Security() {
  const [newIP, setNewIP] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const queryClient = useQueryClient();

  const { data: blacklistedIPs, isLoading, error } = useQuery({
    queryKey: ["blacklisted-ips"],
    queryFn: () => securityService.getBlacklistedIPs(),
    select: (data) => data.map((ip) => ip.ip),
  });

  const addIPMutation = useMutation({
    mutationFn: (ip: string) => securityService.addBlacklistedIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklisted-ips"] });
      setNewIP("");
    },
  });

  const removeIPMutation = useMutation({
    mutationFn: (ip: string) => securityService.removeBlacklistedIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklisted-ips"] });
    },
  });

  const blockEmailMutation = useMutation({
    mutationFn: (email: string) => securityService.blockEmail(email),
    onSuccess: () => {
      setNewEmail("");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading security settings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading security settings. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">Security Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">IP Blacklisting</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                placeholder="Enter IP address"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <PermissionGuard permission="SYSTEM_SECURITY">
                <button
                  onClick={() => addIPMutation.mutate(newIP)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
                >
                  Add IP
                </button>
              </PermissionGuard>
            </div>
            <div className="space-y-2">
              {blacklistedIPs?.map((ip) => (
                <div
                  key={ip}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-gray-100">{ip}</span>
                  <PermissionGuard permission="SYSTEM_SECURITY">
                    <button
                      onClick={() => removeIPMutation.mutate(ip)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </PermissionGuard>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Email Blocking</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email or domain"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <PermissionGuard permission="SYSTEM_SECURITY">
                <button
                  onClick={() => blockEmailMutation.mutate(newEmail)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
                >
                  Block
                </button>
              </PermissionGuard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
