import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSupplier } from "@/api/supplier/actions";
import {
  Dialog,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { LoaderButton } from "@/components/loader-button"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  supplier: Supplier | null;
}

export const DeleteSupplierModal = ({ supplier, ...props }: Props) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (supplierId?: number) => {
    if (!supplierId) return;

    try {
      setLoading(true)
      const { error, message } = await deleteSupplier(supplierId)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      title={`Estás seguro de eliminar a ${supplier?.name}?`}
      description="Esta acción no se puede deshacer. Esto eliminará permanentemente al proveedor."
      {...props}
    >
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <LoaderButton
          label="Eliminar"
          loadLabel="Eliminando.."
          disabled={loading}
          variant="destructive"
          onClick={() => onSubmit(supplier?.id)}
        />
      </DialogFooter>
    </Modal>
  )
}