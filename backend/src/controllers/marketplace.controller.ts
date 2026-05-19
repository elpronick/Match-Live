import type { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true },
      take: 20
    });

    const profiles = users
      .filter(u => u.profile) // Solo los que tengan perfil
      .map(u => {
        const p = u.profile!;
        return {
          id: u.id,
          name: u.name,
          city: p.city || 'Desconocida',
          budget: p.budget ? `${p.budget} €/mes` : 'Sin definir',
          lifestyle: p.lifestyle || 'Variado',
          description: p.description || 'Sin descripción',
          // Campos extra para la UI de Deck que no están en la BD real
          age: Math.floor(Math.random() * 15) + 20, // 20-34 años
          image: `https://i.pravatar.cc/300?u=${u.id}`, // Avatar aleatorio consistente
          tag: p.lifestyle === 'Social y activo' ? 'Extrovertido' : 'Compatibilidad Alta',
          mutualInterest: Math.random() > 0.5,
          lookingFor: 'Habitación o alquilar juntos',
          traits: [p.lifestyle || 'Tranquilo', p.budget ? `<= ${p.budget}€` : 'Flexible', 'Amigable']
        };
      });

    res.json(profiles);
  } catch (error) {
    console.error('Error fetching marketplace profiles:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const likeProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Al ser de acceso libre, no requerimos JWT ni guardamos en BBDD por ahora.
    // Simplemente simulamos que el Like fue exitoso.
    
    res.json({ success: true, message: `Like enviado al perfil ${id}` });
  } catch (error) {
    console.error('Error liking profile:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
