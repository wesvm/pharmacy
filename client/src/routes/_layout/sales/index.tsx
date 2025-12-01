import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getSales } from '@/api/sale/queries'
import { SalesTable } from '@/components/pages/sale/data-table'
import { columns } from '@/components/pages/sale/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/sales/')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Ventas - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza las ventas de productos a los clientes.',
        },
      ],
    }
  }
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getSales(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Ventas</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.sales && <SalesTable columns={columns} data={data.sales} />}
      </SimpleCard>
    </div>
  )
}
