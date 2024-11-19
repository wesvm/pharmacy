import * as z from "zod";

export const saleFormSchema = z.object({
  customerName: z.string().trim().min(1, "Requerido"),
  customerDNI: z.string().trim()
    .min(8, "El dni debe tener 8 digitos")
    .max(8, "El dni debe tener 8 digitos")
    .regex(/^\d+$/, "Debe contener solo números"),
  address: z.string().trim(),
  delivery: z.boolean().default(false).optional(),
  saleItems: z.array(z.object({
    productId: z.number(),
    quantity: z.number()
  })).min(1, "Agrege al menos 1 producto"),
  total: z.coerce.number(),
  userId: z.number()
}).refine(
  (values) => !values.delivery || (values.delivery && values.address.length > 0),
  {
    message: "La dirección es requerida",
    path: ["address"],
  }
);

export type SaleFormSchema = z.infer<typeof saleFormSchema>;
