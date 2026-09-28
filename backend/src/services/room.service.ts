import { prisma } from '../db/prisma.js';
import type { CreateRoomInput } from '../schemas/room.schema.js';

export class RoomService {
  static async getAllRooms() {
    const rooms = await prisma.room.findMany({
      include: {
        owner: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return rooms.map((r) => ({
      ...r,
      image: r.imageUrl,
      price: `${r.price} EUR/mes`,
    }));
  }

  static async getRoomById(id: string) {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        owner: { select: { name: true, email: true, profile: true } },
      },
    });

    if (!room) {
      throw new Error('ROOM_NOT_FOUND');
    }

    return room;
  }

  static async createRoom(ownerId: string, input: CreateRoomInput) {
    return prisma.room.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        location: input.location,
        imageUrl: input.imageUrl,
        isAvailable: input.isAvailable ?? true,
        ownerId,
      },
    });
  }
}
