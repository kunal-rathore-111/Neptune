import { NODE_ENV } from './utils/envVariables';

export const cookieOptions = {
  httpOnly: true, // for hasToken explicitly make httpOnly false
  sameSite: NODE_ENV === 'production' ? ('none' as 'none') : ('lax' as 'lax'),
  secure: NODE_ENV === 'production',
  domain: NODE_ENV === 'production' ? '.kunalrathore.in' : undefined,
};
