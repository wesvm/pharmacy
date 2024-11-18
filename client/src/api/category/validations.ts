import * as z from "zod"

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  description: z.string().trim().min(1, "Requerido"),
})

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;