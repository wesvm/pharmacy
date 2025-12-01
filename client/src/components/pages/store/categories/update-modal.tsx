import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateCategory } from '@/api/category/actions'
import { type CategoryFormSchema, categoryFormSchema } from '@/api/category/validations'
import { LoaderButton } from '@/components/loader-button'
import { Modal } from '@/components/modal'
import { CategoryForm } from '@/components/pages/store/categories/form'
import { Button } from '@/components/ui/button'
import { type Dialog, DialogClose, DialogFooter } from '@/components/ui/dialog'
import type { Category } from '@/types/store'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  category: Category | null
}

export const UpdateCategoryModal = ({ category, ...props }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name,
      description: category?.description ?? '',
    },
  })

  useEffect(() => {
    form.reset({
      name: category?.name,
      description: category?.description ?? '',
    })
  }, [category, form])

  const onSubmit = async (values: CategoryFormSchema) => {
    if (!category) return

    try {
      const { error, message } = await updateCategory(category.id, values)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({
        predicate: (query) => ['categories', 'products'].includes(query.queryKey[0] as string),
        refetchType: 'all',
      })
      form.reset()
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (_error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    }
  }

  return (
    <Modal
      title="Actualizar categoria"
      description="Actualiza los datos para la categoria."
      onInteractOutside={(e) => e.preventDefault()}
      className="max-w-md"
      {...props}
    >
      <CategoryForm form={form} onSubmit={onSubmit}>
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
      </CategoryForm>
    </Modal>
  )
}
