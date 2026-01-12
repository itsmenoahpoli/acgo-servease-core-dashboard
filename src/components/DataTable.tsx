import { useState } from "react";
import DataTableComponent, { TableColumn } from "react-data-table-component";
import { HiChevronUpDown } from "react-icons/hi2";
import { useUIStore } from "@/store/uiStore";

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: boolean;
  paginationPerPage?: number;
  paginationRowsPerPageOptions?: number[];
  selectableRows?: boolean;
  onSelectedRowsChange?: (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: T[];
  }) => void;
  title?: string;
  customStyles?: any;
}

const getCustomStyles = (isDark: boolean) => ({
  table: {
    style: {
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      border: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      borderRadius: "8px",
      overflow: "hidden",
    },
  },
  headRow: {
    style: {
      backgroundColor: isDark ? "#374151" : "#f8f9fa",
      borderBottom: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      minHeight: "48px",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      color: isDark ? "#d1d5db" : "#495057",
      textTransform: "uppercase",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRight: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      "&:last-child": {
        borderRight: "none",
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      color: isDark ? "#9ca3af" : "#6b7280",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "6px",
      paddingBottom: "6px",
      borderRight: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
  rows: {
    style: {
      borderBottom: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      minHeight: "40px",
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      "&:hover": {
        backgroundColor: isDark ? "#374151" : "#f8f9fa",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
  pagination: {
    style: {
      borderTop: isDark ? "1px solid #4b5563" : "1px solid #e9ecef",
      paddingTop: "16px",
      paddingBottom: "16px",
      color: isDark ? "#d1d5db" : "#212529",
    },
  },
});

export function DataTable<T>({
  data,
  columns,
  loading = false,
  pagination = true,
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [10, 25, 50, 100],
  selectableRows = true,
  onSelectedRowsChange,
  customStyles: customStylesProp,
}: DataTableProps<T>) {
  const [resetPaginationToggle] = useState(false);
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  const columnsWithSortIcon = columns.map((col) => {
    if (!col.sortable) return col;
    return {
      ...col,
      sortIcon: (
        <div className="inline-flex items-center ml-2">
          <HiChevronUpDown className="w-4 h-4 text-gray-500" />
        </div>
      ),
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <DataTableComponent
        columns={columnsWithSortIcon}
        data={data}
        progressPending={loading}
        pagination={pagination}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationResetDefaultPage={resetPaginationToggle}
        paginationComponentOptions={{
          rowsPerPageText: "Show",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
        }}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        customStyles={customStylesProp || getCustomStyles(isDark)}
        highlightOnHover
        pointerOnHover
        dense
      />
    </div>
  );
}
