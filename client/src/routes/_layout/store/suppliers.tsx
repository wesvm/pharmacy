import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getSuppliers } from '@/api/supplier/queries'
import { SuppliersTable } from '@/components/pages/store/suppliers/data-table'
import { columns } from '@/components/pages/store/suppliers/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/store/suppliers')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Gestión de Proveedores - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza y administra los proveedores registrados.',
        },
      ],
    }
  },
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Proveedores</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.suppliers && <SuppliersTable columns={columns} data={data.suppliers} />}
      </SimpleCard>
    </div>
  )
}
