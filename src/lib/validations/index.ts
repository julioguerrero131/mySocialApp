import { z } from "zod"

// Schemas
export const signUpValidation = z.object({
  name: z.string().min(2, { message: "Nombre muy corto." } ),
  username: z.string().min(2, { message: "Usuario muy corto." } ),
  email: z.string().email(),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." } )
})

export const signInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." } )
})

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string()
})