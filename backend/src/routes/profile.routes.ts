import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateProfileSchema } from '../schemas/profile.schema.js';

const router = Router();

// Todas las rutas de perfil requieren autenticación
router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', validate(updateProfileSchema), updateProfile);

export default router;
