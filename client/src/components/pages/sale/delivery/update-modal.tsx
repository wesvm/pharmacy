import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { updateDelivery } from "@/api/delivery/actions";
import { deliveryFormSchema, DeliveryFormSchema } from "@/api/delivery/validations";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { Modal } from "@/components/modal";
import { DeliveryForm } from "@/components/pages/sale/delivery/form";
import { DeliveryStatus } from "@/lib/const";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  delivery: Delivery | null;
}

export const UpdateDeliveryModal = ({ delivery, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<DeliveryFormSchema>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      address: delivery?.address,
      deliveryDate: delivery?.deliveryDate ? new Date(delivery.deliveryDate) : undefined,
      status: delivery?.status as DeliveryStatus,
    }
  })

  useEffect(() => {
    form.reset({
      address: delivery?.address,
      deliveryDate: delivery?.deliveryDate ? new Date(delivery.deliveryDate) : undefined,
      status: delivery?.status as DeliveryStatus,
    })
  }, [delivery, form])

  const onSubmit = async (values: DeliveryFormSchema) => {
    if (!delivery) return

    try {
      const { error, message } = await updateDelivery(delivery.id, values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Actualizar delivery"
      description="Actualiza los datos del delivery."
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
      {...props}
    >
      <DeliveryForm
        form={form}
        onSubmit={onSubmit}
      >
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <LoaderButton
            label="Actualizar"
            loadLabel="Actualizando.."
            disabled={form.formState.isSubmitting}
            type="submit"
          />
        </DialogFooter>
      </DeliveryForm>
    </Modal>
  )
}