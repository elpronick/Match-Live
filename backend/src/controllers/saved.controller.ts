import type { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getSavedProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const saved = await prisma.savedProperty.findMany({
      where: { userId },
      include: {
        room: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedSaved = saved.map(s => ({
      ...s,
      property_id: s.roomId
    }));

    res.json(formattedSaved);
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const addSavedProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const { roomId } = req.body;

    const saved = await prisma.savedProperty.create({
      data: {
        userId,
        roomId
      }
    });

    res.status(201).json({ message: 'Propiedad guardada', saved });
  } catch (error) {
    console.error('Error adding saved property:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const removeSavedProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const { roomId } = req.params;

    await prisma.savedProperty.delete({
      where: {
        userId_roomId: {
          userId,
          roomId
        }
      }
    });

    res.json({ message: 'Propiedad eliminada de guardados' });
  } catch (error) {
    console.error('Error removing saved property:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
