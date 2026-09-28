import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        res.status(400).json({
          message: 'Error de validación en los datos enviados',
          errors,
        });
        return;
      }
      res.status(500).json({ message: 'Error interno en la validación' });
    }
  };
};
