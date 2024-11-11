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
import { DataTable } from '@/components/data-table/data-table';
import { DeleteUserModal } from '@/components/user/delete-modal';
import { UpdateUserModal } from '../update-modal';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/api/roles/queries';
import { CreateUserModal } from '../create-modal';

interface UsersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const useUserRowActionStore = createRowActionStore<User>();

export function UsersTable<TData, TValue>({
  columns,
  data,
}: UsersTableProps<TData, TValue>) {
  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles()
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    [])
  const [sorting, setSorting] = useState<SortingState>([]);
  const { row, type, clearRowAction } = useUserRowActionStore();
  const filterFields: DataTableFilterField<User>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombres..",
    },
    {
      id: "role",
      label: "Rol",
      options: roles?.roles.map((role) => ({
        label: role.name.toUpperCase(),
        value: role.name,
      }))
    }
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
          <CreateUserModal />
        </DataTableToolbar>
      </DataTable>
      <UpdateUserModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        user={row}
      />
      <DeleteUserModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        user={row}
      />
    </>
  );
}