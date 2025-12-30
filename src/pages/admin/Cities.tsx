import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { cityService } from "@/services/city.service";
import { City } from "@/types";
import { PermissionGuard } from "@/app/guards/PermissionGuard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Spinner } from "@/components/Spinner";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createFormikValidator } from "@/utils/formValidation";

const citySchema = z.object({
  name: z.string().min(1, "City name is required"),
});

type CityFormValues = z.infer<typeof citySchema>;

export default function Cities() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: cities, isLoading, error } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => cityService.getAllCities(),
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => cityService.createCity({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setShowCreateForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      cityService.updateCity(id, { enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Spinner label="Loading cities..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading cities. Please try again.</p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<City>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.enabled ? "Enabled" : "Disabled"),
      sortable: true,
      cell: (row) => (
        <StatusBadge
          status={row.enabled ? "Enabled" : "Disabled"}
          className={
            row.enabled
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <PermissionGuard permission="TENANT_MANAGE">
          <button
            onClick={() =>
              updateMutation.mutate({
                id: row.id,
                enabled: !row.enabled,
              })
            }
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-gray-100">City Management</h1>
        <PermissionGuard permission="TENANT_MANAGE">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
          >
            Create City
          </button>
        </PermissionGuard>
      </div>
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
            Create New City
          </h2>
          <Formik
            initialValues={{ name: "" }}
            validate={createFormikValidator(citySchema)}
            onSubmit={(values, { setSubmitting }) => {
              createMutation.mutate(values.name, {
                onSettled: () => {
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex gap-2">
                <div className="flex-1">
                  <Field
                    type="text"
                    name="name"
                    placeholder="City name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm font-medium"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
                >
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <DataTable
        data={cities || []}
        columns={columns}
        loading={isLoading}
        pagination
        paginationPerPage={10}
        selectableRows={false}
      />
    </div>
  );
}
