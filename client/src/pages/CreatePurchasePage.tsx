import { useQuery } from "@tanstack/react-query";
import { getProductsToPurchase } from "@/api/product/queries";

import { ProductFilters } from "@/components/pages/sale/product-filters";
import { ProductList } from "@/components/pages/sale/product-list";
import { SimpleCard } from "@/components/simple-card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { PaymentSection } from "@/components/pages/purchase/form";
import SEO from "@/setup/seo";

export default function CreatePurchasePage() {
  const { status, data } = useQuery({
    queryKey: ['productsToPurchase'],
    queryFn: () => getProductsToPurchase()
  });

  return (
    <SEO
      title="Realizar Compra - Pharmacy"
      description="Selecciona los productos para realizar una compra."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/purchases'>
                Todas las compras
              </Link>
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
              <ProductList
                data={data}
                status={status}
                type="purchase"
              />
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