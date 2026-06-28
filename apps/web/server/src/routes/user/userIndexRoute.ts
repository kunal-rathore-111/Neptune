import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';

import { content } from './content/contentRoute';
import { userAccount } from './account/userAccountRoute';
import { shareContent } from './share/shareContentRoute';
import { shareUser } from './share/shareUserRoute';
import { otp } from './otp/otpRoute';

export const user = express();

user.use('/account', userAccount);


user.use('/content', authMiddleware, content);

user.use('/otp', otp);

user.use('/share-content', shareContent);
user.use('/share-user', shareUser);
