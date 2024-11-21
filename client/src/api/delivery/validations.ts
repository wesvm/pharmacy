import { DELIVERY_STATUSES } from "@/lib/const";
import * as z from "zod";

export const deliveryFormSchema = z.object({
  address: z.string().trim().min(1, "Requerido"),
  deliveryDate: z.date({ required_error: "Requerido" }),
  status: z.enum(DELIVERY_STATUSES, {
    required_error: "Requerido",
  }),
});

export type DeliveryFormSchema = z.infer<typeof deliveryFormSchema>;
