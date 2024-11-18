import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "El nombre es requerido"),
    description: z.string().trim().min(1, "Requerido"),
    salePrice: z.coerce.number().min(1, "Requerido").nonnegative(),
    purchasePrice: z.coerce.number().min(1, "Requerido").nonnegative(),
    stockQuantity: z.coerce.number().min(0, "Requerido").nonnegative(),
    categoryId: z.coerce.number().min(1),
    supplierId: z.coerce.number().min(1),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});

export const searchProductSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    categoryId: z.coerce.number().optional(),
    isArchived: z.coerce.boolean().optional(),
  }),
});
