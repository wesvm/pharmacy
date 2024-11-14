import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { createRowActionStore } from '@/store/row-action-store';
import { CreateCategoryModal } from '@/components/pages/store/categories/create-modal';
import { UpdateCategoryModal } from '@/components/pages/store/categories/update-modal';
import { DeleteCategoryModal } from '@/components/pages/store/categories/delete-modal';

interface Props {
  columns: ColumnDef<Category>[];
  data: Category[];
}

export const useCategoryRowActionStore = createRowActionStore<Category>();

export function CategoriesTable({
  columns,
  data,
}: Props) {
  const { row, type, clearRowAction } = useCategoryRowActionStore();
  const filterFields: DataTableFilterField<Category>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombre..",
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields} >
        <CreateCategoryModal />
      </DataTable>
      <UpdateCategoryModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        category={row}
      />
      <DeleteCategoryModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        category={row}
      />
    </>
  );
}
