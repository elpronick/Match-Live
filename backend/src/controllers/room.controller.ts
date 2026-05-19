import type { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        owner: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedRooms = rooms.map(r => ({
      ...r,
      image: r.imageUrl,
      price: `${r.price} EUR/mes`
    }));

    res.json(formattedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        owner: { select: { name: true, email: true, profile: true } }
      }
    });

    if (!room) {
      res.status(404).json({ message: 'Habitación no encontrada' });
      return;
    }

    res.json(room);
  } catch (error) {
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

    const { title, description, price, location, imageUrl } = req.body;

    const room = await prisma.room.create({
      data: {
        title,
        description,
        price,
        location,
        imageUrl,
        ownerId
      }
    });

    res.status(201).json({ message: 'Habitación creada con éxito', room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
