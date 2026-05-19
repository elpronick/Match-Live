import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Ejemplo de ruta protegida para verificar el token
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso a ruta protegida concedido', user: (req as any).user });
});

export default router;
