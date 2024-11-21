import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<Delivery>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "sale.customerName",
    header: "Cliente",
  },
  {
    accessorKey: "sale.customerDNI",
    header: "DNI",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "sale.saleDate",
    header: "Fecha compra",
    cell: ({ row }) => (format(row.original.sale?.saleDate!, "dd/MM/yyyy HH:mm"))
  },
  {
    accessorKey: "sale.deliveryDate",
    header: "Fecha de entrega",
    cell: ({ row }) => (row.original.deliveryDate
      ? format(row.original.deliveryDate, "dd/MM/yyyy HH:mm")
      : null
    )
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  },
]