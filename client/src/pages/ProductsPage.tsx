import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product/queries";
import { SimpleCard } from "@/components/simple-card";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "@/components/pages/store/products/data-table/columns";
import { ProductsTable } from "@/components/pages/store/products/data-table";
import SEO from "@/setup/seo";

export default function ProductsPage() {
  const { status, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  });

  return (
    <SEO
      title="Gestión de Productos - Pharmacy"
      description="Visualiza y administra los productos."
    >
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Productos</h1>
      </SimpleCard>
      <SimpleCard>
        {status === 'pending' && (
          <div className="w-full space-y-2 overflow-auto">
            <Skeleton className="h-10 w-40 lg:w-64" />
            <Skeleton className="h-96" />
          </div>
        )}

        {data?.products && (
          <ProductsTable
            columns={columns}
            data={data.products}
          />
        )}
      </SimpleCard>
    </SEO>
  )
}