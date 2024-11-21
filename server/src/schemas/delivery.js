import z from "zod";

export const createDeliverySchema = z.object({
  body: z.object({
    address: z.string().trim().min(1, "Requerido"),
    deliveryDate: z.coerce.date({ required_error: "Requerido" }),
    status: z.enum(["Pendiente", "En progreso", "Entregado", "Cancelado"], {
      required_error: "Requerido",
    }),
  }),
});

export const updateDeliverySchema = z.object({
  body: createDeliverySchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});