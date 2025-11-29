import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getProductsToSale } from '@/api/product/queries'
import { PaymentSection } from '@/components/pages/sale/payment-form'
import { ProductFilters } from '@/components/pages/sale/product-filters'
import { ProductList } from '@/components/pages/sale/product-list'
import { SimpleCard } from '@/components/simple-card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { productFiltersSchema } from '@/hooks/use-product-filters'


export const Route = createFileRoute('/_layout/sales/new')({
  component: RouteComponent,
  validateSearch: productFiltersSchema,
  head: () => {
    return {
      meta: [
        { title: 'Nueva Venta - Pharmacy' },
        {
          name: 'description',
          content: 'Realiza una nueva venta de productos a los clientes.',
        },
      ],
    }
  }
})

function RouteComponent() {
  const { status, data } = useQuery({
    queryKey: ['productsToSale'],
    queryFn: () => getProductsToSale(),
  })

  return (
    <div>
      <SimpleCard className="p-0">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={65}>
            <div className="p-6 space-y-4">
              <ProductFilters />
              <ProductList data={data} status={status} type="sale" />
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
