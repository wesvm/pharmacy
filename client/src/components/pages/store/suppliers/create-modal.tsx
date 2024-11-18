import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSupplier } from "@/api/supplier/actions";
import { supplierFormSchema, SupplierFormSchema } from "@/api/supplier/validations";
import { SupplierForm } from "@/components/pages/store/suppliers/form";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { Modal } from "@/components/modal";

export const CreateSupplierModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<SupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: '',
      contactInfo: ''
    }
  })

  const onSubmit = async (values: SupplierFormSchema) => {
    try {
      const { error, message } = await createSupplier(values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      form.reset()
      toast.success(message)
      setOpen(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Agregar proveedor"
      description="Ingresa los datos para el nuevo proveedor."
      triggerContent={
        <Button>
          Agregar proveedor
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
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
            label="Guardar"
            loadLabel="Guardando.."
            disabled={form.formState.isSubmitting}
            type="submit"
          />
        </DialogFooter>
      </SupplierForm>
    </Modal>
  )
}