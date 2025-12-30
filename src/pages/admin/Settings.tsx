import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { createFormikValidator } from "@/utils/formValidation";

const settingsSchema = z.object({
  otpExpiry: z
    .string()
    .min(1, "OTP expiry is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "OTP expiry must be a positive number"
    ),
  maintenanceMode: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings() {
  const handleSubmit = async (values: SettingsFormValues) => {
    console.log("Settings saved:", values);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold dark:text-gray-100">System Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6">
        <PermissionGuard permission="SYSTEM_SECURITY">
          <Formik
            initialValues={{ otpExpiry: "300", maintenanceMode: false }}
            validate={createFormikValidator(settingsSchema)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    OTP Expiry (seconds)
                  </label>
                  <Field
                    type="number"
                    name="otpExpiry"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="otpExpiry"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Maintenance Mode
                  </label>
                  <div className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="maintenanceMode"
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Enable maintenance mode
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 text-sm font-medium"
                  >
                    Save Settings
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </PermissionGuard>
      </div>
    </div>
  );
}
