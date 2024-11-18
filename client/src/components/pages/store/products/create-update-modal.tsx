import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
} from "@/api/product/actions";
import { Dialog, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { useForm } from "react-hook-form";
import {
  productFormSchema,
  ProductFormSchema,
} from "@/api/product/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductForm } from "./form";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  product?: Product | null;
}

const defaultValues = {
  name: "",
  description: "",
  salePrice: 0.00,
  purchasePrice: 0.00,
  stockQuantity: 0,
  categoryId: 0,
  supplierId: 0,
};

export const CreateUpdateProductModal = ({ product, ...props }: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? { ...product, description: product.description ?? "" }
      : defaultValues,
  });

  useEffect(() => {
    form.reset(
      product
        ? { ...product, description: product.description ?? "" }
        : defaultValues
    );
  }, [product, form]);

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      const { error, message } = product
        ? await updateProduct(product.id, values)
        : await createProduct(values);

      if (error) {
        toast.error(error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.reset()
      toast.success(message);
      props.onOpenChange?.(false);
      setOpen(false)
    } catch (error) {
      toast.error("Algo ha ido mal, por favor inténtelo más tarde.");
    }
  };

  const title = product ? "Actualizar producto" : "Agregar producto";
  const description = product
    ? "Actualiza los datos para el producto."
    : "Ingresa los datos para el nuevo producto.";
  const triggerContent = product === undefined ? <Button>Agregar producto</Button> : null;

  return (
    <Modal
      title={title}
      description={description}
      triggerContent={triggerContent}
      onInteractOutside={(e) => e.preventDefault()}
      open={open}
      onOpenChange={setOpen}
      {...props}
    >
      <ProductForm form={form} onSubmit={onSubmit}>
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
      </ProductForm>
    </Modal>
  );
};
