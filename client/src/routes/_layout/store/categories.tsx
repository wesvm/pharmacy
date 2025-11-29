import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getCategories } from '@/api/category/queries'
import { CategoriesTable } from '@/components/pages/store/categories/data-table'
import { columns } from '@/components/pages/store/categories/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/store/categories')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Gestión de Categorías - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza y administra las categorías de productos.',
        },
      ],
    }
  },
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Categorias</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.categories && <CategoriesTable columns={columns} data={data.categories} />}
      </SimpleCard>
    </div>
  )
}
