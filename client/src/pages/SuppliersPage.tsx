import { getSuppliers } from "@/api/supplier/queries";
import { columns } from "@/components/pages/store/suppliers/data-table/columns";
import { SuppliersTable } from "@/components/pages/store/suppliers/data-table";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export default function SuppliersPage() {
  const { status, data } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers()
  });

  return (
    <div>
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Proveedores</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.suppliers && (
          <SuppliersTable
            columns={columns}
            data={data.suppliers}
          />
        )}
      </SimpleCard>
    </div>
  )
}