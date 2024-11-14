import z from "zod";

export const createSupplierSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "El nombre del proveedor es requerido"),
    contactInfo: z.string().trim().min(1, "Requerido"),
  }),
});

export const updateSupplierSchema = z.object({
  body: createSupplierSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});
