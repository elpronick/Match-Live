import type { Request, Response } from 'express';
import { RoomService } from '../services/room.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await RoomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const room = await RoomService.getRoomById(id);
    res.json(room);
  } catch (error: any) {
    if (error.message === 'ROOM_NOT_FOUND') {
      res.status(404).json({ message: 'Habitación no encontrada' });
      return;
    }
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createRoom = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const room = await RoomService.createRoom(ownerId, req.body);
    res.status(201).json({ message: 'Habitación creada con éxito', room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
