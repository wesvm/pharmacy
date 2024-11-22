import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { saleFormSchema, SaleFormSchema } from "@/api/sale/validations"
import { LoaderButton } from "@/components/loader-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { IdCard, MapPin, Minus, Plus, Trash2, User } from "lucide-react"
import { formatter } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useAuth } from "@/setup/auth-context"
import { createSale } from "@/api/sale/actions"
import { useQueryClient } from "@tanstack/react-query"
import { ModalTicket } from "./modal-ticket"

export const PaymentSection = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [saleId, setSaleId] = useState<number | null>(null);
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, removeAll } = useCartStore();
  const form = useForm<SaleFormSchema>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      customerName: '',
      customerDNI: '',
      address: '',
      delivery: false,
      saleItems: [],
      total: 0,
      userId: user?.id
    },
  })
  const subtotal = items.reduce((acc, item) => acc + Number(item.total), 0);
  const deliveryFee = form.getValues('delivery') ? 5.00 : 0;

  useEffect(() => {
    form.setValue("saleItems", items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })))
    if (items.length > 0) form.trigger("saleItems");

    form.setValue("total", subtotal + deliveryFee)
    if (!form.getValues('delivery')) {
      form.setValue("address", '')
      form.trigger("address");
    }
  }, [items, deliveryFee])

  const onSubmit = async (values: SaleFormSchema) => {
    try {
      const { error, message, sale: createdSale } = await createSale(values)

      if (error) {
        toast.error(error)
        return
      }

      setSaleId(createdSale.id);
      setOpen(true);

      queryClient.invalidateQueries({
        predicate: (query) =>
          ['productsToSale', 'products', 'sales', 'deliveries'].includes(query.queryKey[0] as string),
        refetchType: 'all'
      });
      form.reset()
      removeAll()
      toast.success(message)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <h2 className="text-2xl font-bold">Cliente</h2>
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center space-x-2">
                  <FormLabel><User className="size-4 " /></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Marck Zuckerberg"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerDNI"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>
                    <IdCard className="size-4" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="76543210"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel><MapPin className="size-4" /></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Avenida las fresas"
                      disabled={form.formState.isSubmitting || !form.getValues('delivery')}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Delivery</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                      aria-readonly
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <h2 className="text-2xl font-bold">Productos</h2>
          <FormField
            control={form.control}
            name="saleItems"
            render={() => (
              <FormItem>
                <FormLabel>Agrege los productos</FormLabel>
                {items.length === 0 ? (
                  <p className="text-gray-500 flex justify-center py-4">No hay productos en el carrito...</p>
                ) : (
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.productId}
                        className="flex justify-between items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700"
                      >
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <span className="text-sm">{formatter.format(item.total)}</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex items-center">
                            <Button variant="ghost" size="icon"
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="size-4" />
                            </Button>
                            <span className="px-2">{item.quantity}</span>
                            <Button variant="ghost" size="icon"
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stockQuantity}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon"
                            type="button"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatter.format(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatter.format(deliveryFee + subtotal)}</span>
            </div>
          </div>
          <LoaderButton
            label="Guardar"
            loadLabel="Guardando.."
            disabled={form.formState.isSubmitting}
            type="submit"
          />
        </form>
      </Form>
      {saleId && (
        <ModalTicket
          saleId={saleId}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  )
}