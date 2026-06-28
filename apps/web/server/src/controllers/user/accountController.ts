import type { Request, Response } from 'express';
import AppError from '../../middlewares/appError';
import {
  deleteAccountService,
  fetchUserProfileService,
  updatePasswordService,
} from '../../services/users/userAccountService';

const fetchUserProfile = async (req: Request, res: Response) => {
  const result = await fetchUserProfileService(req.userId);
  /* remove the password from the final data we are sending to frontend */
  const { password, ...userProfile } = result;
  return res.status(200).send({ userProfileData: userProfile });
};

const deleteAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await deleteAccountService({ email, password });

  if (result.length === 0) {
    throw new AppError('Account not deleted, please try again', 500, 'InternalError');
  }
  return res.status(200).send({ message: 'Account deleted successfully' });
};

const updatePassword = async (req: Request, res: Response) => {
  const { email, password, newPassword } = req.body;

  const result = await updatePasswordService({ email, password, newPassword });
  if (!result) {
    throw new AppError('User password update request failed, please try again', 500, 'InternalError');
  }
  return res.status(200).send({ message: 'Password updated successfully' });
};

export const accountController = { deleteAccount, updatePassword, fetchUserProfile };
