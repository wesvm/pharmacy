import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';

interface Props {
  columns: ColumnDef<Sale>[];
  data: Sale[];
}

export function SalesTable({
  columns,
  data,
}: Props) {

  return (
    <>
      <DataTable columns={columns} data={data}>
        {/* TODO: HERE */}
      </DataTable>
    </>
  );
}