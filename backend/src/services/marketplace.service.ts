import { prisma } from '../db/prisma.js';

export class MarketplaceService {
  static async getProfiles(currentUserId?: string) {
    const users = await prisma.user.findMany({
      where: currentUserId ? { id: { not: currentUserId } } : undefined,
      include: {
        profile: true,
        ...(currentUserId ? { sentLikes: { where: { toUserId: currentUserId } } } : {}),
      },
      take: 20,
    });

    return users
      .filter((u) => u.profile)
      .map((u) => {
        const p = u.profile!;
        // Si el usuario objetivo le ha dado like al usuario autenticado, hay interés mutuo real
        const hasLikedCurrentUser = currentUserId ? (u.sentLikes?.length ?? 0) > 0 : false;

        return {
          id: u.id,
          name: u.name || 'Compañero',
          city: p.city || 'Desconocida',
          budget: p.budget ? `${p.budget} €/mes` : 'Sin definir',
          lifestyle: p.lifestyle || 'Variado',
          description: p.description || 'Sin descripción',
          age: p.age || 25,
          image: p.avatarUrl || `https://i.pravatar.cc/300?u=${u.id}`,
          tag: p.lifestyle === 'Social y activo' ? 'Extrovertido' : 'Compatibilidad Alta',
          mutualInterest: hasLikedCurrentUser,
          lookingFor: 'Habitación o alquilar juntos',
          traits: [p.lifestyle || 'Tranquilo', p.budget ? `Hasta ${p.budget} €/mes` : 'Presupuesto flexible', 'Amigable'],
        };
      });
  }

  static async likeProfile(toUserId: string, fromUserId?: string) {
    // Si es un usuario invitado (sin login), respondemos con éxito para el modo demo
    if (!fromUserId) {
      return {
        success: true,
        isMatch: false,
        message: `Like registrado en modo invitado para el perfil ${toUserId}`,
      };
    }

    if (fromUserId === toUserId) {
      throw new Error('CANNOT_LIKE_SELF');
    }

    // 1. Registrar el Like (upsert para evitar duplicados)
    await prisma.like.upsert({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
      create: { fromUserId, toUserId },
      update: {},
    });

    // 2. Comprobar si existe el Like recíproco (toUser -> fromUser)
    const reciprocalLike = await prisma.like.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      },
    });

    // 3. Si existe reciprocidad, formalizamos el Match en la base de datos
    if (reciprocalLike) {
      const [user1Id, user2Id] = [fromUserId, toUserId].sort();
      await prisma.match.upsert({
        where: {
          user1Id_user2Id: { user1Id, user2Id },
        },
        create: { user1Id, user2Id },
        update: {},
      });

      return {
        success: true,
        isMatch: true,
        message: '¡Es un Match mutuo! Ambas personas están interesadas.',
      };
    }

    return {
      success: true,
      isMatch: false,
      message: `Like enviado a ${toUserId}. Interés pendiente de reciprocidad.`,
    };
  }

  static async getMatches(userId: string) {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: { include: { profile: true, rooms: true } },
        user2: { include: { profile: true, rooms: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return matches.map((m) => {
      const partner = m.user1Id === userId ? m.user2 : m.user1;
      return {
        matchId: m.id,
        createdAt: m.createdAt,
        partner: {
          id: partner.id,
          name: partner.name,
          email: partner.email,
          profile: partner.profile,
          rooms: partner.rooms,
        },
      };
    });
  }
}
