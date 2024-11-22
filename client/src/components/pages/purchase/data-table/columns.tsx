import { formatter } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "purchaseDate",
    header: "Fecha",
    cell: ({ row }) => format(row.original.purchaseDate, "dd/MM/yyyy")
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (formatter.format(row.original.total))
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "user.name",
    header: "Usuario",
  },
]