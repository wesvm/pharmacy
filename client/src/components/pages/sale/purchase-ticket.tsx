import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatter } from "@/lib/utils";
import {
  CalendarDays,
  IdCard,
  Receipt,
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const PurchaseTicket = ({ sale }: { sale: SaleDetails }) => {
  const deliveryCost = sale.deliveryId ? 5.0 : 0;
  const subtotal = sale.total - deliveryCost;

  return (
    <Card className="max-w-xs shadow-lg w-full" id="purchase-ticket">
      <CardHeader className="text-center border-b mb-4">
        <CardTitle className="text-2xl font-bold">Ticket de compra</CardTitle>
        <CardDescription>¡Gracias por su compra!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="size-4" />
            <span className="font-medium">Cliente:</span>
          </div>
          <span>{sale.customerName}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <IdCard className="size-4" />
            <span className="font-medium">DNI:</span>
          </div>
          <span>{sale.customerDNI}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Receipt className="size-4" />
            <span className="font-medium">Orden #:</span>
          </div>
          <span>ORD-{sale.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarDays className="size-4" />
            <span className="font-medium">Fecha:</span>
          </div>
          <span>{new Date(sale.saleDate).toLocaleString()}</span>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="font-semibold">Items</h3>
          <ul className="space-y-2">
            {sale.saleItems.map((item) => (
              <li key={item.id} className="text-sm">
                <div className="flex justify-between">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>{formatter.format(item.price)}</span>
                </div>
                <span className="text-gray-500">(Prec. Unit: {formatter.format(item.product.salePrice)})</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="grid">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatter.format(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatter.format(deliveryCost)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatter.format(sale.total)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}