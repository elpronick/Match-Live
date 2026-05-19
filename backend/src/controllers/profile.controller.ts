import type { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const { profile, password, ...userData } = user;
    res.json({ ...userData, ...profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const { name, city, budget, lifestyle, description } = req.body;

    // Actualizamos el nombre en User
    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name }
      });
    }

    // Actualizamos el resto en Profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { city, budget, lifestyle, description },
      create: {
        userId,
        city,
        budget,
        lifestyle,
        description
      }
    });

    res.json({ message: 'Perfil actualizado correctamente', success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
