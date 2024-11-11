import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/store/categories/queries";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesTable } from "@/components/pages/store/categories/data-table";
import { columns } from "@/components/pages/store/categories/data-table/columns";

export default function CategoriesPage() {
  const { status, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  return (
    <div>
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Categorias</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.categories && (
          <CategoriesTable
            columns={columns}
            data={data.categories}
          />
        )}
      </SimpleCard>
    </div>
  )
}