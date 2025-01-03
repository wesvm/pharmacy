import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateUser } from "@/api/user/actions";
import { updateUserSchema, UpdateUserSchema } from "@/api/user/validations";
import { UserForm } from "@/components/pages/user/form";
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
  user: User | null;
}

export const UpdateUserModal = ({ user, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: '',
      confirmPassword: '',
      role: user?.role
    }
  })

  useEffect(() => {
    form.reset({
      name: user?.name,
      email: user?.email,
      password: '',
      confirmPassword: '',
      role: user?.role
    })
  }, [user, form])

  const onSubmit = async (values: UpdateUserSchema) => {
    if (!user) return

    try {
      const { error, message } = await updateUser(user.id, values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Actualizar usuario"
      description="Actualiza los datos para el usuario."
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
      {...props}
    >
      <UserForm
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
      </UserForm>
    </Modal>
  )
}