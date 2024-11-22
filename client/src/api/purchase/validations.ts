import * as z from "zod";

export const purchaseFormSchema = z.object({
  purchaseItems: z.array(z.object({
    productId: z.number(),
    quantity: z
      .number({ message: "Ingrese una cantidad válida" })
      .min(1, "Ingrese una cantidad válida")
      .nonnegative()
  })).min(1, "Agrege al menos 1 producto"),
  total: z.coerce.number(),
  userId: z.number(),
});

export type PurchaseFormSchema = z.infer<typeof purchaseFormSchema>;