import { z } from 'zod';

export const sendMessageSchema = z.object({
  receiverId: z.string().uuid('El ID del receptor debe ser un UUID válido'),
  roomId: z.string().uuid('El ID de la habitación debe ser un UUID válido').optional().nullable(),
  content: z.string().min(1, 'El mensaje no puede estar vacío').max(1000, 'El mensaje no puede superar los 1000 caracteres'),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
