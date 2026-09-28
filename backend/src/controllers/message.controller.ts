import type { Response } from 'express';
import { MessageService } from '../services/message.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getConversation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const { partnerId } = req.params as { partnerId: string };
    const roomId = req.query.roomId ? String(req.query.roomId) : undefined;

    const messages = await MessageService.getConversation(userId, partnerId, roomId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const message = await MessageService.sendMessage(userId, req.body);
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
