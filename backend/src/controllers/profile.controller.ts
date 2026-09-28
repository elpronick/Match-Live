import type { Response } from 'express';
import { ProfileService } from '../services/profile.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const profile = await ProfileService.getProfile(userId);
    res.json(profile);
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
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

    const updated = await ProfileService.updateProfile(userId, req.body);
    res.json({ message: 'Perfil actualizado correctamente', success: true, profile: updated });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
