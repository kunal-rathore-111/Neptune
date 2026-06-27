import type { Request, Response } from 'express';
import { createUserService, findUserService } from '../../services/users/userAccountService';
import { createJWTSession } from '../../libs/sessions';
import { NODE_ENV } from '../../libs/utils/envVariables';

export const signUpController = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  // Using email as name - no separate name field needed
  const result = await createUserService({ email, name, password });
  // remove password from data to return user data on frontend
  //  Destructure "password as _ named variable" out, and put everything else into "userData"
  const { password: _, ...userData } = result;

  const id = userData.id;
  const token = await createJWTSession({ id, email });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: NODE_ENV === 'production' ? true : false,
  });

  res.cookie('hasTokenCookie', true, {
    httpOnly: false, // for protected route validation
  })

  return res.status(201).json({
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
  const id = userData.id;

  const jwtToken = await createJWTSession({ id, email }); // creating jwt and sending in cookies

  res.cookie('token', jwtToken, {
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // this logic for http (secure true) (none only works with secure true)
    secure: NODE_ENV === 'production' ? true : false,
  });

  res.cookie('hasTokenCookie', true, {
    httpOnly: false, // for protected route validation
  })

  return res.status(200)
    .json({
      message: 'Sign-in successfull',
      userData: userData,
    });
};

export const signOutController = (req: Request, res: Response) => {
  // Clear the authentication cookie by setting it with expired date

  res.cookie('token', '', {
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: NODE_ENV === 'production' ? true : false,
    expires: new Date(0), // Set expiration to (Jan 1, 1970) = immediately expired
  })

  res.cookie('hasTokenCookie', '', {
    httpOnly: false,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: NODE_ENV === 'production' ? true : false,
    expires: new Date(0), // Set expiration to (Jan 1, 1970) = immediately expired
  });

  return res.status(200)
    .json({
      message: 'Sign-out successfully',
    });
};
