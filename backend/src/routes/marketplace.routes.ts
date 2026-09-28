import { Router } from 'express';
import { getProfiles, likeProfile, getMatches } from '../controllers/marketplace.controller.js';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas de Marketplace con soporte de autenticación opcional
router.get('/profiles', optionalAuthMiddleware, getProfiles);
router.post('/profiles/:id/like', optionalAuthMiddleware, likeProfile);

// Ruta protegida para obtener los matches confirmados del usuario
router.get('/matches', authMiddleware, getMatches);

export default router;
