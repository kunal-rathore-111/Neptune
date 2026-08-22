import type { Request, Response } from 'express';
import { createUserService, findUserService } from '../../services/users/userAccountService';
import { createJWTSession } from '../../libs/sessions';
import { cookieOptions } from '../../libs/cookieOptions';

export const signUpController = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  // Using email as name - no separate name field needed
  const result = await createUserService({ email, name, password });
  // remove password from data to return user data on frontend
  //  Destructure "password as _ named variable" out, and put everything else into "userData"
  const { password: _, ...userData } = result;

  const id = userData.id;
  const token = await createJWTSession({ id, email });

  res.cookie('token', token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.cookie('hasTokenCookie', true, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.cookie('hasTokenCookie', true, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false, // for protected route validation
  })

  return res.status(200)
    .json({
      message: 'Sign-in successfull',
      userData: userData,
    });
};

export const signOutController = (req: Request, res: Response) => {
  // Clear the authentication cookie 
  res.clearCookie('token', cookieOptions);
  res.clearCookie('hasTokenCookie', { ...cookieOptions, httpOnly: false });


  return res.status(200)
    .json({
      message: 'Sign-out successfully',
    });
};
