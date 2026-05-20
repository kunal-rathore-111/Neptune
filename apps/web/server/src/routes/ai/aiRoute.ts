import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import aiController from '../../controllers/ai/aiController';
import { queryChatMiddleware } from '../../middlewares/queryChatMiddleware';

export const aiRouter = express();

aiRouter.post('/magic-fill', authMiddleware, aiController.magicFill);

aiRouter.post('/global-chat', authMiddleware, queryChatMiddleware, aiController.globalChat);
