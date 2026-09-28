import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      ...result,
    });
  } catch (error: any) {
    if (error.message === 'USER_EXISTS') {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await AuthService.login(req.body);
    res.json({
      message: 'Inicio de sesión exitoso',
      ...result,
    });
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No autorizado' });
      return;
    }

    const user = await AuthService.getCurrentUser(userId);
    res.json({ user });
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
