import { useQuery } from "@tanstack/react-query";
import { getProductsToSale } from "@/api/product/queries";
import { PaymentSection } from "@/components/pages/sale/payment-form";
import { ProductFilters } from "@/components/pages/sale/product-filters";
import { ProductList } from "@/components/pages/sale/product-list";
import { SimpleCard } from "@/components/simple-card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import SEO from "@/setup/seo";

export default function CreateSalesPage() {
  const { status, data } = useQuery({
    queryKey: ['productsToSale'],
    queryFn: () => getProductsToSale()
  });

  return (
    <SEO
      title="Nueva Venta - Pharmacy"
      description="Selecciona los productos para realizar una venta."
    >
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
    </SEO>

  )
}