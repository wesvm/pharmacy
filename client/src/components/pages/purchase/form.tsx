import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { purchaseFormSchema, PurchaseFormSchema } from "@/api/purchase/validations"
import { LoaderButton } from "@/components/loader-button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { usePurchaseCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { IdCard, Mail, Minus, Plus, Trash2, User } from "lucide-react"
import { formatter } from "@/lib/utils"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useAuth } from "@/setup/auth-context"
import { createPurchase } from "@/api/purchase/actions"
import { useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { ModalTicket } from "./modal-ticket"

export const PaymentSection = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [purchaseId, setPurchaseId] = useState<number | null>(null);
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, removeAll } = usePurchaseCartStore();
  const form = useForm<PurchaseFormSchema>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      purchaseItems: [],
      total: 0,
      userId: user?.id,
    },
  })
  const total = items.reduce((acc, item) => acc + Number(item.total), 0);

  useEffect(() => {
    form.setValue("purchaseItems", items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })))
    if (items.length > 0) form.trigger("purchaseItems");

  }, [items, form])

  const onSubmit = async (values: PurchaseFormSchema) => {
    try {
      const { error, message, purchase: createdPurchase } = await createPurchase(values)

      if (error) {
        toast.error(error)
        return
      }

      setPurchaseId(createdPurchase.id);
      setOpen(true);

      queryClient.invalidateQueries({
        predicate: (query) =>
          ['productsToSale', 'products', 'productsToPurchase', 'purchases', 'summary']
            .includes(query.queryKey[0] as string),
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
          <h2 className="text-2xl font-bold">Usuario</h2>
          <div>
            <div className="flex items-center space-x-2">
              <User className="size-4 " />
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="size-4 " />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IdCard className="size-4 " />
              <span className="capitalize">{user?.role}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Productos</h2>
          <FormField
            control={form.control}
            name="purchaseItems"
            render={() => (
              <FormItem>
                <FormLabel>Agrege los productos a comprar</FormLabel>
                {items.length === 0 ? (
                  <p className="text-gray-500 flex justify-center py-4">No hay productos en el carrito...</p>
                ) : (
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li key={item.productId}>
                        <div className="flex justify-between items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-700">
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
                              <span className="px-2">
                                <Input
                                  type="number"
                                  value={item.quantity || ''}
                                  onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value, 10);
                                    updateQuantity(item.productId, newQuantity);
                                  }}
                                  className="w-24"
                                />
                              </span>
                              <Button variant="ghost" size="icon"
                                type="button"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
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
                        </div>
                        {form.formState.errors.purchaseItems?.[index]?.quantity?.message && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.purchaseItems[index].quantity.message}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {Array.isArray(form.formState.errors.purchaseItems) &&
                  form.formState.errors.purchaseItems.some((err) => err) ? (
                  <p className="text-sm font-medium text-destructive">
                    Verifica la compra.
                  </p>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatter.format(total)}</span>
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
      {purchaseId && (
        <ModalTicket
          purchaseId={purchaseId}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  )
}