import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { createRowActionStore } from '@/store/row-action-store';
import { DeleteSupplierModal } from '@/components/pages/store/suppliers/delete-modal';
import { CreateSupplierModal } from '@/components/pages/store/suppliers/create-modal';
import { UpdateSupplierModal } from '@/components/pages/store/suppliers/update-modal';

interface Props {
  columns: ColumnDef<Supplier>[];
  data: Supplier[];
}

export const useSupplierRowActionStore = createRowActionStore<Supplier>();

export function SuppliersTable({
  columns,
  data,
}: Props) {
  const { row, type, clearRowAction } = useSupplierRowActionStore();
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
        <CreateSupplierModal />
      </DataTable>
      <UpdateSupplierModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        supplier={row}
      />
      <DeleteSupplierModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        supplier={row}
      />
    </>
  );
}