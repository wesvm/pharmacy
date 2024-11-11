import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"

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
  },
  {
    accessorKey: "supplier",
    header: "Proveedor",
  },
];