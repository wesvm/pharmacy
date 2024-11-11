import {
  type ColumnDef,
} from '@tanstack/react-table';
import { createRowActionStore } from '@/store/row-action-store';
import { DataTable } from '@/components/data-table/data-table';
import { UpdateRoleModal } from '@/components/pages/role/update-modal';
import { DeleteRoleModal } from '@/components/pages/role/delete-modal';
import { CreateRoleModal } from '@/components/pages/role/create-modal';

interface Props {
  columns: ColumnDef<Role>[];
  data: Role[];
}

export const useRoleRowActionStore = createRowActionStore<Role>();

export function RolesTable({
  columns,
  data,
}: Props) {
  const { row, type, clearRowAction } = useRoleRowActionStore();
  const filterFields: DataTableFilterField<Role>[] = [
    {
      id: "name",
      label: "Rol",
      placeholder: "Busca por nombre..",
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields}>
        <CreateRoleModal />
      </DataTable>
      <UpdateRoleModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        role={row}
      />
      <DeleteRoleModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        role={row}
      />
    </>
  );
}