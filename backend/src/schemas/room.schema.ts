import { z } from 'zod';

export const createRoomSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().positive('El precio debe ser un número positivo'),
  location: z.string().min(2, 'La ubicación debe tener al menos 2 caracteres'),
  imageUrl: z.string().url('La URL de la imagen no es válida').optional().or(z.literal('')),
  isAvailable: z.boolean().optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
