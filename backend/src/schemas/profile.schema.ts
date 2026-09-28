import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres').optional(),
  budget: z.number().int().nonnegative('El presupuesto debe ser un número positivo').optional(),
  lifestyle: z.string().min(3, 'El estilo de vida debe tener al menos 3 caracteres').optional(),
  description: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
  avatarUrl: z.string().url('La URL del avatar no es válida').optional().or(z.literal('')),
  age: z.number().int().min(18, 'Debes ser mayor de 18 años').max(100).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
