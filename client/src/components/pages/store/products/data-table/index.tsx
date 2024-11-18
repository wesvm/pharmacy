import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/category/queries';
import { getSuppliers } from '@/api/supplier/queries';
import { createRowActionStore } from '@/store/row-action-store';
import { DeleteProductModal } from '@/components/pages/store/products/delete-modal';
import { CreateUpdateProductModal } from '../create-update-modal';

interface Props {
  columns: ColumnDef<Product>[];
  data: Product[];
}

export const useProductRowActionStore = createRowActionStore<Product>();

export function ProductsTable({
  columns,
  data,
}: Props) {
  const { row, type, clearRowAction } = useProductRowActionStore();
  const { status: statusCategories, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const { status: statusSuppliers, data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers()
  });

  const filterFields: DataTableFilterField<Product>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombre..",
    },
    {
      id: "category",
      label: "Categoria",
      status: statusCategories,
      options: statusCategories === 'success'
        ? categories.categories.map((category) => ({
          label: category.name,
          value: category.name,
        })) : []
    },
    {
      id: "supplier",
      label: "Proveedor",
      status: statusSuppliers,
      options: statusSuppliers === 'success'
        ? suppliers.suppliers.map((supplier) => ({
          label: supplier.name,
          value: supplier.name,
        })) : []
    }
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields} >
        <CreateUpdateProductModal />
      </DataTable>
      <CreateUpdateProductModal
        open={type === 'update'}
        onOpenChange={clearRowAction}
        product={row}
      />
      <DeleteProductModal
        open={type === 'delete'}
        onOpenChange={clearRowAction}
        product={row}
      />
    </>
  );
}