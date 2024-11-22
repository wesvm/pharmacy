import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api/sale/queries";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesTable } from "@/components/pages/sale/data-table";
import { columns } from "@/components/pages/sale/data-table/columns";
import SEO from "@/setup/seo";

export default function SalesPage() {
  const { status, data } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getSales()
  });

  return (
    <SEO
      title="Gestión de Ventas - Pharmacy"
      description="Visualiza y gestiona las ventas realizadas."
    >
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

        {data?.sales && (
          <SalesTable
            columns={columns}
            data={data.sales}
          />
        )}
      </SimpleCard>
    </SEO>
  )
}