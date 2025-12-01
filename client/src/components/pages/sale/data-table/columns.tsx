import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'
import type { Sale } from '@/types/store'

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'customerName',
    header: 'Cliente',
  },
  {
    accessorKey: 'customerDNI',
    header: 'Dni',
  },
  {
    accessorKey: 'saleDate',
    header: 'Fecha y hora',
    cell: ({ row }) => format(row.original.saleDate, 'dd/MM/yyyy HH:mm'),
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => formatter.format(row.original.total),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
  },
  {
    accessorKey: 'user.name',
    header: 'Vendedor',
  },
]
