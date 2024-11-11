import { getUsers } from "@/api/user/queries";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersTable } from "@/components/pages/user/data-table";
import { columns } from "@/components/pages/user/data-table/columns";
import { useQuery } from "@tanstack/react-query";

export default function UsersPage() {
  const { status, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
  });

  return (
    <div>
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Usuarios</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.users && (
          <UsersTable
            columns={columns}
            data={data.users}
          />
        )}
      </SimpleCard>
    </div>
  )
}