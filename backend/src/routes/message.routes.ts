import { Router } from 'express';
import { getConversation, sendMessage } from '../controllers/message.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { sendMessageSchema } from '../schemas/message.schema.js';

const router = Router();

// Todas las rutas de mensajería requieren autenticación
router.use(authMiddleware);

router.get('/:partnerId', getConversation);
router.post('/', validate(sendMessageSchema), sendMessage);

export default router;
