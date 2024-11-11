import { ColumnDef } from "@tanstack/react-table"
import { RowActions } from "./row-actions"


export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Rol",
    cell: ({ row }) => (row.original.name.toUpperCase()),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  },
]