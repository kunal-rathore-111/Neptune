import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';

import { content } from './content/contentRoute';
import { userAccount } from './account/userAccountRoute';
import { shareContent } from './share/shareContentRoute';
import { shareUser } from './share/shareUserRoute';

export const user = express();

user.use('/account', authMiddleware, userAccount);

user.use('/content', authMiddleware, content);

user.use('/share-content', shareContent);
user.use('/share-user', shareUser);
