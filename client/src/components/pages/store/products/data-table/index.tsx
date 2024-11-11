import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/store/categories/queries';
import { getSuppliers } from '@/api/store/supplier/queries';

interface Props {
  columns: ColumnDef<Product>[];
  data: Product[];
}

export function ProductsTable({
  columns,
  data,
}: Props) {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const { data: suppliers } = useQuery({
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
      options: categories?.categories.map((category) => ({
        label: category.name,
        value: category.name,
      }))
    },
    {
      id: "supplier",
      label: "Proveedor",
      options: suppliers?.suppliers.map((supplier) => ({
        label: supplier.name,
        value: supplier.name,
      }))
    }
  ]

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields} >
        {/* TODO: HERE */}
      </DataTable>
    </>
  );
}