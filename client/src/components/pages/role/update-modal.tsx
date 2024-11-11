import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateRole } from "@/api/role/actions";
import { roleFormSchema, RoleFormSchema, } from "@/api/role/validations";
import { RoleForm } from "@/components/pages/role/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { useEffect } from "react";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  role: Role | null;
}

export const UpdateRoleModal = ({ role, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<RoleFormSchema>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: role?.name,
    }
  })

  useEffect(() => {
    form.reset({
      name: role?.name,
    })
  }, [role, form])

  const onSubmit = async (values: RoleFormSchema) => {
    if (!role) return

    try {
      const { error, message } = await updateRole(role.id, values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['roles'] });
      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Actualizar rol</DialogTitle>
          <DialogDescription>
            Actualiza los datos para el rol.
          </DialogDescription>
        </DialogHeader>
        <RoleForm
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
        </RoleForm>
      </DialogContent>
    </Dialog>
  )
}