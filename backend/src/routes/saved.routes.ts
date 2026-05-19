import { Router } from 'express';
import { getSavedProperties, addSavedProperty, removeSavedProperty } from '../controllers/saved.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getSavedProperties);
router.post('/', addSavedProperty);
router.delete('/:roomId', removeSavedProperty);

export default router;
