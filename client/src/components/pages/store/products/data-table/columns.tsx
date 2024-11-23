import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { RowActions } from "./row-actions";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "salePrice",
    header: "Precio de Venta",
    cell: ({ row }) => (formatter.format(row.original.salePrice as number))
  },
  {
    accessorKey: "purchasePrice",
    header: "Precio de Compra",
    cell: ({ row }) => (formatter.format(row.original.purchasePrice as number))
  },
  {
    accessorKey: "stockQuantity",
    header: "Cantidad en Stock",
  },
  {
    accessorKey: "category",
    header: "Categoría",
    filterFn: (row, id, value) => value.includes(row.getValue(id))
  },
  {
    accessorKey: "supplier",
    header: "Proveedor",
    filterFn: (row, id, value) => value.includes(row.getValue(id))
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  }
];