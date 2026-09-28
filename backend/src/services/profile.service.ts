import { prisma } from '../db/prisma.js';
import type { UpdateProfileInput } from '../schemas/profile.schema.js';

export class ProfileService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const { profile, password: _, ...userData } = user;
    return { ...userData, ...profile };
  }

  static async updateProfile(userId: string, input: UpdateProfileInput) {
    // 1. Si se proporciona nombre, actualizamos User
    if (input.name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name: input.name },
      });
    }

    // 2. Actualizamos o creamos Profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        city: input.city,
        budget: input.budget,
        lifestyle: input.lifestyle,
        description: input.description,
        avatarUrl: input.avatarUrl,
        age: input.age,
      },
      create: {
        userId,
        city: input.city,
        budget: input.budget,
        lifestyle: input.lifestyle,
        description: input.description,
        avatarUrl: input.avatarUrl,
        age: input.age,
      },
    });

    return profile;
  }
}
