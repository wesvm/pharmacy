import z from "zod";

export const createRoleSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre del rol es obligatorio")
      .toLowerCase(),
  }),
});

export const updateRoleSchema = z.object({
  body: createRoleSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});
