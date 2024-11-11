import {
  type ColumnDef,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/api/role/queries';
import { createRowActionStore } from '@/store/row-action-store';
import { DataTable } from '@/components/data-table/data-table';
import { DeleteUserModal } from '@/components/pages/user/delete-modal';
import { UpdateUserModal } from '@/components/pages/user/update-modal';
import { CreateUserModal } from '@/components/pages/user/create-modal';

interface Props {
  columns: ColumnDef<User>[];
  data: User[];
}

export const useUserRowActionStore = createRowActionStore<User>();

export function UsersTable({
  columns,
  data,
}: Props) {
  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles()
  });
  const { row, type, clearRowAction } = useUserRowActionStore();
  const filterFields: DataTableFilterField<User>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombres..",
    },
    {
      id: "role",
      label: "Rol",
      options: roles?.roles.map((role) => ({
        label: role.name.toUpperCase(),
        value: role.name,
      }))
    }
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields}>
        <CreateUserModal />
      </DataTable>
      <UpdateUserModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        user={row}
      />
      <DeleteUserModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        user={row}
      />
    </>
  );
}