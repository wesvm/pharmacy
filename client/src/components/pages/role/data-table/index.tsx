import {
  type ColumnDef,
  ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { createRowActionStore } from '@/store/row-action-store';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { UpdateRoleModal } from '@/components/pages/role/update-modal';
import { DeleteRoleModal } from '@/components/pages/role/delete-modal';
import { CreateRoleModal } from '@/components/pages/role/create-modal';

interface UsersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const useRoleRowActionStore = createRowActionStore<Role>();

export function RolesTable<TData, TValue>({
  columns,
  data,
}: UsersTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [])
  const [sorting, setSorting] = useState<SortingState>([]);
  const { row, type, clearRowAction } = useRoleRowActionStore();
  const filterFields: DataTableFilterField<Role>[] = [
    {
      id: "name",
      label: "Rol",
      placeholder: "Busca por nombre..",
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters,
      sorting
    },
  })

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <CreateRoleModal />
        </DataTableToolbar>
      </DataTable>
      <UpdateRoleModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        role={row}
      />
      <DeleteRoleModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        role={row}
      />
    </>
  );
}