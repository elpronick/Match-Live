import { prisma } from '../db/prisma.js';

export class SavedService {
  static async getSavedProperties(userId: string) {
    const saved = await prisma.savedProperty.findMany({
      where: { userId },
      include: {
        room: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return saved.map((s) => ({
      ...s,
      property_id: s.roomId,
    }));
  }

  static async addSavedProperty(userId: string, roomId: string) {
    return prisma.savedProperty.create({
      data: {
        userId,
        roomId,
      },
    });
  }

  static async removeSavedProperty(userId: string, roomId: string) {
    return prisma.savedProperty.delete({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });
  }
}
