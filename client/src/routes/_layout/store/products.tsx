import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getProducts } from '@/api/product/queries'
import { ProductsTable } from '@/components/pages/store/products/data-table'
import { columns } from '@/components/pages/store/products/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/store/products')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Gestión de Productos - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza y administra los productos disponibles en la tienda.',
        },
      ],
    }
  },
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Productos</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.products && <ProductsTable columns={columns} data={data.products} />}
      </SimpleCard>
    </div>
  )
}
