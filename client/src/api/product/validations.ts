import * as z from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  description: z.string().trim().min(1, "Requerido"),
  salePrice: z.coerce
    .number()
    .min(0.01, "El precio debe ser mayor a 0")
    .nonnegative(),
  purchasePrice: z.coerce
    .number()
    .min(0.01, "El precio debe ser mayor a 0")
    .nonnegative(),
  stockQuantity: z.coerce.number().nonnegative(),
  categoryId: z.coerce.number().min(1, "Requerido"),
  supplierId: z.coerce.number().min(1, "Requerido"),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
