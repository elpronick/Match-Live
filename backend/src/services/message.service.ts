import { prisma } from '../db/prisma.js';
import type { SendMessageInput } from '../schemas/message.schema.js';

export class MessageService {
  static async getConversation(userId: string, partnerId: string, roomId?: string | null) {
    const whereClause: any = {
      OR: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
    };

    if (roomId) {
      whereClause.roomId = roomId;
    }

    const messages = await prisma.message.findMany({
      where: whereClause,
      include: {
        sender: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map((m) => ({
      id: m.id,
      senderId: m.senderId,
      receiverId: m.receiverId,
      roomId: m.roomId,
      text: m.content,
      isSender: m.senderId === userId,
      senderName: m.sender.name,
      createdAt: m.createdAt,
      time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  }

  static async sendMessage(senderId: string, input: SendMessageInput) {
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId: input.receiverId,
        roomId: input.roomId || null,
        content: input.content,
      },
      include: {
        sender: { select: { id: true, name: true } },
      },
    });

    return {
      id: message.id,
      senderId: message.senderId,
      receiverId: message.receiverId,
      roomId: message.roomId,
      text: message.content,
      isSender: true,
      senderName: message.sender.name,
      createdAt: message.createdAt,
      time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
}
