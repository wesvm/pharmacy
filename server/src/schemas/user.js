import * as z from "zod"

const userSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  email: z.string().trim().email("Ingrese un correo valido"),
  password: z.string().trim(),
  confirmPassword: z.string().trim(),
  role: z.string().min(1, "Selecciona un rol")
})

export const createUserSchema = z.object({
  body: userSchema.extend({
    password: z.string().trim().min(1, "La contraseña es requerida"),
    confirmPassword: z.string().trim().min(1, "La confirmación de contraseña es requerida"),
  }).refine((values) => values.password === values.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
});

export const updateUserSchema = z.object({
  body: userSchema
    .partial()
    .refine((values) => {
      if (values.password || values.confirmPassword) {
        return values.password === values.confirmPassword;
      }
      return true;
    }, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }),
  params: z.object({
    id: z.coerce.number().nonnegative(),
  }),
});