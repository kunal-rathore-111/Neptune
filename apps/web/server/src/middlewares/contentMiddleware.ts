import type { NextFunction, Request, Response } from 'express';
import { contentValidator } from '@repo/validation';
import AppError from './appError';

// content zod validation
export const contentZod_MW = (req: Request, res: Response, next: NextFunction) => {
  const validation = contentValidator(req.body);

  if (validation.success) return next();
  else
    throw new AppError(
      validation?.error?.issues?.map((i) => i.path + '- ' + i.message).join(',') || 'Invalid value',
      400,
      'BadRequest',
    );
};

export const Content_MW = (req: Request, res: Response, next: NextFunction) => {
  const contentId = Array.isArray(req.params.contentId) ? req.params.contentId[0] : req.params.contentId;
  if (!contentId) {
    throw new AppError('Content Id not found', 404, 'NotFound');
  }
  req.contentId = contentId;
  return next();
};
