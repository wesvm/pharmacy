import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCategory } from "@/api/store/category/actions";
import {
  Dialog,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { LoaderButton } from "@/components/loader-button"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  category: Category | null;
}

export const DeleteCategoryModal = ({ category, ...props }: Props) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (categoryId?: number) => {
    if (!categoryId) return;

    try {
      setLoading(true)
      const { error, message } = await deleteCategory(categoryId)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
      title={`Estás seguro de eliminar ${category?.name}?`}
      description="Esta acción no se puede deshacer. Esto eliminará permanentemente la categoria."
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
          onClick={() => onSubmit(category?.id)}
        />
      </DialogFooter>
    </Modal>
  )
}