import * as z from "zod"

export const supplierFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  contactInfo: z.string().trim().min(1, "La información de contacto es requerida"),
})

export type SupplierFormSchema = z.infer<typeof supplierFormSchema>;