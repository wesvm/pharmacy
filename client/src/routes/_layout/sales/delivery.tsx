import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getDeliveries } from '@/api/delivery/queries'
import { DeliveriesTable } from '@/components/pages/sale/delivery/data-table'
import { columns } from '@/components/pages/sale/delivery/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/sales/delivery')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Entregas - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza las entregas de productos a los clientes.',
        },
      ],
    }
  }
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['deliveries'],
    queryFn: () => getDeliveries(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Entregas</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.deliveries && <DeliveriesTable columns={columns} data={data.deliveries} />}
      </SimpleCard>
    </div>
  )
}
