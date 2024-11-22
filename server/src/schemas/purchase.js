import z from "zod";

export const createPurchaseSchema = z.object({
  body: z.object({
    purchaseItems: z.array(z.object({
      productId: z.number().min(1).nonnegative(),
      quantity: z.number().min(1).nonnegative()
    })).min(1),
    total: z.coerce.number().nonnegative(),
    userId: z.number().min(1).nonnegative(),
  })
});