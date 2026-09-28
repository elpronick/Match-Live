import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('El formato del correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('El formato del correo electrónico no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
