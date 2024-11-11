import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "contactInfo",
    header: "Información de contacto",
  },
]