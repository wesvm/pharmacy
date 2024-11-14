import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateSupplier } from "@/api/store/supplier/actions";
import { supplierFormSchema, SupplierFormSchema } from "@/api/store/supplier/validations";
import { SupplierForm } from "@/components/pages/store/suppliers/form";
import {
  Dialog,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { useEffect } from "react";
import { Modal } from "@/components/modal";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  supplier: Supplier | null;
}

export const UpdateSupplierModal = ({ supplier, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<SupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: supplier?.name,
      contactInfo: supplier?.contactInfo ?? '',
    }
  })

  useEffect(() => {
    form.reset({
      name: supplier?.name,
      contactInfo: supplier?.contactInfo ?? '',
    })
  }, [supplier, form])

  const onSubmit = async (values: SupplierFormSchema) => {
    if (!supplier) return

    try {
      const { error, message } = await updateSupplier(supplier.id, values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Actualizar proveedor"
      description="Actualiza los datos para el proveedor."
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
      {...props}
    >
      <SupplierForm
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
      </SupplierForm>
    </Modal>
  )
}