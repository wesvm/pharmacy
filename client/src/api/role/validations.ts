import * as z from "zod"

export const roleFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").toLowerCase().trim(),
})

export type RoleFormSchema = z.infer<typeof roleFormSchema>;