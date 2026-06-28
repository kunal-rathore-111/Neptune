import express from 'express';
import { signZod } from '../../../middlewares/signMiddleware';
import { updatePassswordSchema, signInSchema } from '@repo/validation';
import { checkBothPasswordsDiff_MW } from '../../../middlewares/accountMiddleware';
import { accountController } from '../../../controllers/user/accountController';
import { authMiddleware } from '../../../middlewares/authMiddleware';
import { resetPasswordMiddleware } from '../../../middlewares/resetPasswordMiddleware';
import { updateUserDetailsController } from '../../../controllers/user/resetUserDetailsController';

export const userAccount = express();

// forgot password/ reset-password
userAccount.post('/reset-password', resetPasswordMiddleware, updateUserDetailsController.resetPassword)


// user account updations like password, profile pic, name, email, deletion
userAccount.get('/user-profile', authMiddleware, accountController.fetchUserProfile);

// email password validation(reusing zod sign middleware for valdating email and password) then query on db
userAccount.delete('/delete-user-account', authMiddleware, signZod(signInSchema), accountController.deleteAccount);

userAccount.patch('/update-user-password', authMiddleware, signZod(updatePassswordSchema), checkBothPasswordsDiff_MW, accountController.updatePassword,);


