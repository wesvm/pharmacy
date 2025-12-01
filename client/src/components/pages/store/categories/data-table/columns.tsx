import type { ColumnDef } from '@tanstack/react-table'
import type { Category } from '@/types/store'
import { RowActions } from './row-actions'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row.original} />,
  },
]
