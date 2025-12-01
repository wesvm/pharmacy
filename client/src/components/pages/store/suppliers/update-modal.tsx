import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateSupplier } from '@/api/supplier/actions'
import { type SupplierFormSchema, supplierFormSchema } from '@/api/supplier/validations'
import { LoaderButton } from '@/components/loader-button'
import { Modal } from '@/components/modal'
import { SupplierForm } from '@/components/pages/store/suppliers/form'
import { Button } from '@/components/ui/button'
import { type Dialog, DialogClose, DialogFooter } from '@/components/ui/dialog'
import type { Supplier } from '@/types/store'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  supplier: Supplier | null
}

export const UpdateSupplierModal = ({ supplier, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<SupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: supplier?.name,
      contactInfo: supplier?.contactInfo ?? '',
    },
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

      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (_error) {
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
      <SupplierForm form={form} onSubmit={onSubmit}>
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
