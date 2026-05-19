import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de perfil requieren autenticación
router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
