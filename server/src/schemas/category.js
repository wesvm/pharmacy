import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre de la categoria es obligatoria")
      .toLowerCase(),
    description: z.string().trim().min(1, "Requerido"),
  }),
});

export const updateCategorySchema = z.object({
  body: createCategorySchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});
