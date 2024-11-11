import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { roleFormSchema, RoleFormSchema } from "@/api/role/validations";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { createRole } from "@/api/role/actions";
import { RoleForm } from "./form";

export const CreateRoleModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<RoleFormSchema>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
    }
  })

  const onSubmit = async (values: RoleFormSchema) => {
    try {
      const { error, message } = await createRole(values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['roles'] });
      form.reset()
      toast.success(message)
      setOpen(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar rol</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Agregar rol</DialogTitle>
          <DialogDescription>
            Ingresa los datos para el nuevo rol.
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
              label="Guardar"
              loadLabel="Guardando.."
              disabled={form.formState.isSubmitting}
              type="submit"
            />
          </DialogFooter>
        </RoleForm>
      </DialogContent>
    </Dialog>
  )
}