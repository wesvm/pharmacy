import { ColumnDef } from "@tanstack/react-table"
import { RowActions } from "./row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombres",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => (row.original.role.toUpperCase()),
  },
  {
    id: "actions",
    cell: ({ row }) => row.original.id !== 1 ? <RowActions row={row.original} /> : null,
  },
]