import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createUser } from "@/api/user/actions";
import { createUserSchema, CreateUserSchema } from "@/api/user/validations";
import { UserForm } from "@/components/pages/user/form";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { Modal } from "@/components/modal";

export const CreateUserModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    }
  })

  const onSubmit = async (values: CreateUserSchema) => {
    try {
      const { error, message } = await createUser(values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      form.reset()
      toast.success(message)
      setOpen(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Agregar usuario"
      description="Ingresa los datos para el nuevo usuario."
      triggerContent={
        <Button>
          Agregar usuario
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
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
            label="Guardar"
            loadLabel="Guardando.."
            disabled={form.formState.isSubmitting}
            type="submit"
          />
        </DialogFooter>
      </UserForm>
    </Modal>
  )
}