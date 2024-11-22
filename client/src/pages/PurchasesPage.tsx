import { getPurchases } from "@/api/purchase/queries";
import { PurchasesTable } from "@/components/pages/purchase/data-table";
import { columns } from "@/components/pages/purchase/data-table/columns";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/setup/seo";

export default function PurchasesPage() {
  const { status, data } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => getPurchases()
  });

  return (
    <SEO
      title="Gestión de Compras - Pharmacy"
      description="Visualiza y gestiona las compras realizadas."
    >
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Compras</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.purchases && (
          <PurchasesTable
            columns={columns}
            data={data.purchases}
          />
        )}
      </SimpleCard>
    </SEO>
  )
}