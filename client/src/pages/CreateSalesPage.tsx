import { PaymentSection } from "@/components/pages/sale/payment-form";
import { ProductFilters } from "@/components/pages/sale/product-filters";
import { ProductList } from "@/components/pages/sale/product-list";
import { SimpleCard } from "@/components/simple-card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";

export default function CreateSalesPage() {
  return (
    <SimpleCard className="p-0">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65}>
          <div className="p-6 space-y-4">
            <ProductFilters />
            <ProductList />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45} className="p-6">
          <PaymentSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </SimpleCard>
  )
}