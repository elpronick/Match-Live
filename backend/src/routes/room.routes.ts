import { Router } from 'express';
import { getAllRooms, getRoomById, createRoom } from '../controllers/room.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createRoomSchema } from '../schemas/room.schema.js';

const router = Router();

// Rutas públicas
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

// Rutas privadas
router.post('/', authMiddleware, validate(createRoomSchema), createRoom);

export default router;
