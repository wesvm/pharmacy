import { useQuery } from "@tanstack/react-query";
import { getDeliveries } from "@/api/delivery/queries";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeliveriesTable } from "@/components/pages/sale/delivery/data-table";
import { columns } from "@/components/pages/sale/delivery/data-table/columns";

export default function DeliveriesPage() {
  const { status, data } = useQuery({
    queryKey: ['deliveries'],
    queryFn: () => getDeliveries()
  });

  return (
    <div>
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Entregas</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.deliveries && (
          <DeliveriesTable
            columns={columns}
            data={data.deliveries}
          />
        )}
      </SimpleCard>
    </div>
  )
}