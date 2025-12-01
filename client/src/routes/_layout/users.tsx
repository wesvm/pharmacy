import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getUsers } from '@/api/user/queries'
import { UsersTable } from '@/components/pages/user/data-table'
import { columns } from '@/components/pages/user/data-table/columns'
import { SimpleCard } from '@/components/simple-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_layout/users')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        { title: 'Gestión de Usuarios - Pharmacy' },
        {
          name: 'description',
          content: 'Visualiza y administra los usuarios registrados.',
        },
      ],
    }
  },
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })

  return (
    <div className="space-y-4">
      <SimpleCard>
        <h1 className="font-bold text-2xl">Usuarios</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.users && <UsersTable columns={columns} data={data.users} />}
      </SimpleCard>
    </div>
  )
}
