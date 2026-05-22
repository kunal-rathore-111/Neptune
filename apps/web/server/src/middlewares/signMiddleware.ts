import type { Request, Response, NextFunction } from 'express';

import AppError from './appError';
import type { ZodSchema } from 'zod';

// middleware factory= middleware inside function
// doing the below thing (returing middleware in function)to pass the diff. schema in route like signup has different signin has different
export const signZod = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.error('\n\n\n', req.body, '\n\n\n');
    const result = schema.safeParse(req.body);
    if (result.success) return next();

    // Formating all validation errors into a readable message
    const errorMessages = result.error.issues
      .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');

    throw new AppError(errorMessages, 400, 'BadRequest');
  };
};
