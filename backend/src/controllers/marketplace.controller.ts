import type { Response } from 'express';
import { MarketplaceService } from '../services/marketplace.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getProfiles = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const profiles = await MarketplaceService.getProfiles(req.user?.id);
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching marketplace profiles:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const likeProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: toUserId } = req.params as { id: string };
    const result = await MarketplaceService.likeProfile(toUserId, req.user?.id);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'CANNOT_LIKE_SELF') {
      res.status(400).json({ message: 'No puedes darte like a ti mismo' });
      return;
    }
    console.error('Error liking profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMatches = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }
    const matches = await MarketplaceService.getMatches(userId);
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
