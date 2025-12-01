import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getProductsToPurchase } from '@/api/product/queries'
import { PaymentSection } from '@/components/pages/purchase/form'
import { ProductFilters } from '@/components/pages/sale/product-filters'
import { ProductList } from '@/components/pages/sale/product-list'
import { SimpleCard } from '@/components/simple-card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { productFiltersSchema } from '@/hooks/use-product-filters'

export const Route = createFileRoute('/_layout/purchases/new')({
  component: RouteComponent,
  validateSearch: productFiltersSchema,
  head: () => {
    return {
      meta: [
        { title: 'Nueva Compra - Pharmacy' },
        {
          name: 'description',
          content: 'Realiza una nueva compra de productos a los proveedores.',
        },
      ],
    }
  }
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['productsToPurchase'],
    queryFn: () => getProductsToPurchase(),
  })

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/purchases">Todas las compras</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Realizar compra</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SimpleCard className="p-0">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={65}>
            <div className="p-6 space-y-4">
              <ProductFilters />
              <ProductList data={data} status={status} type="purchase" />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={45} className="p-6">
            <PaymentSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SimpleCard>
    </div>
  )
}
