import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';

interface Props {
  columns: ColumnDef<Supplier>[];
  data: Supplier[];
}

export function SuppliersTable({
  columns,
  data,
}: Props) {
  const filterFields: DataTableFilterField<Supplier>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombre..",
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields} >
        {/* TODO: HERE */}
      </DataTable>
    </>
  );
}