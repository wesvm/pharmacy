import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "@/api/role/actions";
import { toast } from "sonner";
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
  role: Role | null;
}

export const DeleteRoleModal = ({ role, ...props }: Props) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (roleId?: number) => {
    if (!roleId) return;

    try {
      setLoading(true)
      const { error, message } = await deleteRole(roleId)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['roles'] });
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
          <DialogTitle>Estás seguro de eliminar el rol de {role?.name.toUpperCase()}?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el rol.
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
            onClick={() => onSubmit(role?.id)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}