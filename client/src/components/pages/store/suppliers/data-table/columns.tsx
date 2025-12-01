import type { ColumnDef } from '@tanstack/react-table'
import type { Supplier } from '@/types/store'
import { RowActions } from './row-actions'

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'contactInfo',
    header: 'Información de contacto',
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions row={row.original} />,
  },
]
