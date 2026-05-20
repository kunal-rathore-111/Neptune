import type { Request, Response } from 'express';
import { createUserService, findUserService } from '../../services/users/userAccountService';
import { createJWT } from '../../utils/jwt';
import { NODE_ENV } from '../../utils/envVariables';

export const signUpController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  // Using email as username - no separate username field needed
  const result = await createUserService({ email, username, password });
  // remove password from data to return user data on frontend
  //  Destructure "password as _ named variable" out, and put everything else into "userData"
  const { password: _, ...userData } = result;

  const token = createJWT(userData.id, userData.email);

  return res
    .cookie('token', token, {
      httpOnly: true,
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      secure: NODE_ENV === 'production' ? true : false,
    })
    .status(201)
    .json({
      message: 'Sign-up successfull',
      userData: userData,
    }); // sending cookie so frontend handles  redirect to dashboard improves UX
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // finding  does user exists in db
  const result = await findUserService({ email, password });
  // remove password from data to return user data on frontend
  //  Destructure "password as _ named variable" out, and put everything else into "userData"
  const { password: _, ...userData } = result;
  const jwtToken = createJWT(userData.id, userData.email); // creating jwt and sending in cookies

  res
    .cookie('token', jwtToken, {
      httpOnly: true,
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // this logic for http (secure true) (none only works with secure true)
      secure: NODE_ENV === 'production' ? true : false,
    })
    .status(200)
    .json({
      message: 'Sign-in successfull',
      userData: userData,
    });
};

export const signOutController = (req: Request, res: Response) => {
  // Clear the authentication cookie by setting it with expired date

  res
    .cookie('token', '', {
      httpOnly: true,
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      secure: NODE_ENV === 'production' ? true : false,
      expires: new Date(0), // Set expiration to (Jan 1, 1970) = immediately expired
    })
    .status(200)
    .json({
      message: 'Sign-out successfully',
    });
};
