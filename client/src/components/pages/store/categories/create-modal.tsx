import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createCategory } from "@/api/category/actions";
import { categoryFormSchema, CategoryFormSchema } from "@/api/category/validations";
import { CategoryForm } from "@/components/pages/store/categories/form";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/loader-button";
import { Modal } from "@/components/modal";

export const CreateCategoryModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const onSubmit = async (values: CategoryFormSchema) => {
    try {
      const { error, message } = await createCategory(values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      form.reset()
      toast.success(message)
      setOpen(false)
    } catch (error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Agregar categoria"
      description="Ingresa los datos para la nueva categoria."
      triggerContent={
        <Button>
          Agregar categoria
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
    >
      <CategoryForm
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
      </CategoryForm>
    </Modal>
  )
}