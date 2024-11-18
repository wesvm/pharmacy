import z from "zod";

export const createSaleSchema = z.object({
  body: z.object({
    customerName: z.string().trim().min(1),
    customerDNI: z.string().trim().min(1),
    address: z.string().trim(),
    delivery: z.boolean().default(false).optional(),
    saleItems: z.array(z.object({
      productId: z.number().min(1).nonnegative(),
      quantity: z.number().min(1).nonnegative()
    })).min(1),
    total: z.coerce.number().nonnegative(),
    userId: z.number().nonnegative()
  }).refine(
    (values) => !values.delivery || (values.delivery && values.address.length > 0),
    {
      message: "Required",
      path: ["address"],
    }),
});