import express from 'express';

import { sign } from './sign/signRoute';
import { user } from './user/userIndexRoute';
import { aiRouter } from './ai/aiRoute';

export const indexRoute = express();

// routes
indexRoute.use('/', sign);
indexRoute.use('/user', user);
indexRoute.use('/ai', aiRouter);
