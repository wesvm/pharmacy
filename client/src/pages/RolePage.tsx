import { getRoles } from "@/api/role/queries";
import { RolesTable } from "@/components/pages/role/data-table";
import { columns } from "@/components/pages/role/data-table/columns";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export default function RolesPage() {
  const { status, data } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles()
  });

  return (
    <div>
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Roles</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.roles && (
          <RolesTable
            columns={columns}
            data={data.roles}
          />
        )}
      </SimpleCard>
    </div>
  )
}