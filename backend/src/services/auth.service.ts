import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

export class AuthService {
  static async register(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('USER_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return { token, user: userWithoutPassword };
  }

  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: { profile: true },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });

    const { password: _, profile, ...userData } = user;
    return { token, user: { ...userData, ...profile } };
  }

  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const { password: _, profile, ...userData } = user;
    return { ...userData, ...profile };
  }
}
