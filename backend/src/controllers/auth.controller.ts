import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'Usuario registrado exitosamente', token, user: userWithoutPassword });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });

    const { password: _, profile, ...userData } = user;
    res.json({ message: 'Inicio de sesión exitoso', token, user: { ...userData, ...profile } });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: { profile: true }
    });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const { password: _, profile, ...userData } = user;
    res.json({ user: { ...userData, ...profile } });
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
