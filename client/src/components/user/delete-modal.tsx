import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser } from "@/api/user/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoaderButton } from "@/components/loader-button"
import { Button } from "@/components/ui/button";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  user: User | null;
}

export const DeleteUserModal = ({ user, ...props }: Props) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (userId?: number) => {
    if (!userId) return;

    try {
      setLoading(true)
      const { error, message } = await deleteUser(userId)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Estás seguro de eliminar a {user?.name}?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario.
          </DialogDescription>
        </DialogHeader>
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
            onClick={() => onSubmit(user?.id)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}