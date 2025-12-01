import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getRoles } from '@/api/role/queries'
import { RolesTable } from '@/components/pages/role/data-table'
import { columns } from '@/components/pages/role/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/roles')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Gestión de Roles - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza y gestiona los roles de usuario.',
        },
      ],
    }
  },
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  })
  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Roles</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.roles && <RolesTable columns={columns} data={data.roles} />}
      </SimpleCard>
    </div>
  )
}
