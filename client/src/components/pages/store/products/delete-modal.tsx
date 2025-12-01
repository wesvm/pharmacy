import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteProduct } from '@/api/product/actions'
import { LoaderButton } from '@/components/loader-button'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { type Dialog, DialogClose, DialogFooter } from '@/components/ui/dialog'
import type { Product } from '@/types/store'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  product: Product | null
}

export const DeleteProductModal = ({ product, ...props }: Props) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (productId?: number) => {
    if (!productId) return

    try {
      setLoading(true)
      const { error, message } = await deleteProduct(productId)

      if (error) {
        toast.error(error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(message)
      props.onOpenChange?.(false)
    } catch (_0error) {
      toast.error('Algo ha ido mal, por favor inténtelo más tarde.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      title={`Estás seguro de archivar ${product?.name}?`}
      description="Esta acción no se puede deshacer. El producto será archivado y su stock se establecerá en 0."
      {...props}
    >
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <LoaderButton
          label="Archivar"
          loadLabel="Archivando.."
          disabled={loading}
          variant="destructive"
          onClick={() => onSubmit(product?.id)}
        />
      </DialogFooter>
    </Modal>
  )
}
