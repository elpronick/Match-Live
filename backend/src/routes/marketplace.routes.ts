import { Router } from 'express';
import { getProfiles, likeProfile } from '../controllers/marketplace.controller.js';

const router = Router();

// Rutas públicas de Marketplace
router.get('/profiles', getProfiles);
router.post('/profiles/:id/like', likeProfile);

export default router;
