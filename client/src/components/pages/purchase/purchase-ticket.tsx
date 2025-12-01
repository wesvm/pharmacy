import { CalendarDays, Receipt, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import type { PurchaseDetails } from '@/types/store'

export const PurchaseTicket = ({ purchase }: { purchase: PurchaseDetails }) => {
  return (
    <Card className="max-w-xs shadow-lg w-full" id="purchase-ticket">
      <CardHeader className="text-center border-b mb-4">
        <CardTitle className="text-2xl font-bold">Ticket de compra</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="size-4" />
            <span className="font-medium">Usuario:</span>
          </div>
          <span>{purchase.user.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Receipt className="size-4" />
            <span className="font-medium">Orden #:</span>
          </div>
          <span>ORD-{purchase.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarDays className="size-4" />
            <span className="font-medium">Fecha:</span>
          </div>
          <span>{new Date(purchase.purchaseDate).toLocaleString()}</span>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="font-semibold">Items</h3>
          <ul className="space-y-2">
            {purchase.purchaseItems.map((item) => (
              <li key={item.id} className="text-sm">
                <div className="flex justify-between">
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>{formatter.format(item.price)}</span>
                </div>
                <span className="text-gray-500">
                  Prec. Unit: {formatter.format(item.product.purchasePrice)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="grid">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatter.format(purchase.total)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
