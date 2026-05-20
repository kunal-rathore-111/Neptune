import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'SECRET1.1'; // if no JWT_SECRET in .env then keep SECRET1.1 string as secret

export const createJWT = (id: string, email: string) => {
  return jwt.sign({ id, email }, jwtSecret, { expiresIn: '3d' }); // expire in 3 days
};

export const checkJWT = (token: string) => {
  // if fails then auto cathced by global error middleware and there i defined the jwt 2 cases
  return jwt.verify(token, jwtSecret) as { id: string };
};
