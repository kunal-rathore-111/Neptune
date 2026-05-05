import { Hono } from 'hono';
import { magicFillController } from '../controller/magic-fillController';

export const magicRoute = new Hono();

magicRoute.post('/', magicFillController)
