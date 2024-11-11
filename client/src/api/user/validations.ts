import * as z from "zod"

export const userFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Ingrese un correo valido"),
  password: z.string().trim(),
  confirmPassword: z.string().trim(),
  role: z.string().min(1, "Selecciona un rol")
})

export const createUserSchema = userFormSchema.extend({
  password: z.string().trim().min(1, "La contraseña es requerida"),
  confirmPassword: z.string().trim().min(1, "La confirmación de contraseña es requerida"),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const updateUserSchema = userFormSchema.extend({
}).refine((values) => values.password === values.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;