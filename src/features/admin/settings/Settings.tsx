import { useState } from 'react'
import { PermissionGuard } from '@/app/guards/PermissionGuard'

export default function Settings() {
  const [otpExpiry, setOtpExpiry] = useState('300')
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <PermissionGuard permission="SYSTEM_SECURITY">
          <div>
            <label className="block mb-2 font-medium">OTP Expiry (seconds)</label>
            <input
              type="number"
              value={otpExpiry}
              onChange={(e) => setOtpExpiry(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Maintenance Mode</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Enable maintenance mode</span>
            </div>
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Settings
            </button>
          </div>
        </PermissionGuard>
      </div>
    </div>
  )
}

