import { Router } from 'express';
import { getAllRooms, getRoomById, createRoom } from '../controllers/room.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

// Rutas privadas
router.post('/', authMiddleware, createRoom);

export default router;
