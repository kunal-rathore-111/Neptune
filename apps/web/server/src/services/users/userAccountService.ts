import { db } from '../../config/dbDrizzle';
import { UsersTable } from '../../drizzle/schema';
import AppError from '../../middlewares/appError';
import { decodePassword, hashPassword } from '../../utils/hashFunc';
import { eq } from 'drizzle-orm';
import type { SignInTypes, SignUpTypes, UpdatePasswordTypes } from '@repo/validation';

export const createUserService = async ({ username, email, password }: SignUpTypes) => {
  const hashedPassword = await hashPassword(password);

  const user = await db
    .insert(UsersTable)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning();
  if (!user[0]?.id) throw new AppError('Signup failed, Please try again later', 500, 'Database Error');
  return user[0];
};
export const findUserService = async ({ email, password }: SignInTypes) => {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email),
  });

  if (!user) throw new AppError('User not found', 404, 'NotFound');

  const decodePasswordResponse = await decodePassword(password, user.password);
  if (!decodePasswordResponse) throw new AppError('Wrong password', 401, 'Unauthorized');
  return user;
};

export const fetchUserProfileService = async (userId: string) => {
  // find the first user with that id
  const result = await db.query.UsersTable.findFirst({ where: eq(UsersTable.id, userId) });

  if (!result) {
    throw new AppError('User profile not found', 404, 'Not found');
  }
  return result;
};

export const deleteAccountService = async ({ email, password }: SignInTypes) => {
  // first find user with the email and password, if found then delete
  const user = await findUserService({ email, password });
  return await db.delete(UsersTable).where(eq(UsersTable.id, user.id)).returning();
};

export const updatePasswordService = async ({ email, password, newPassword }: UpdatePasswordTypes) => {
  // first find user with the email and password, if found then updatePassword
  const user = await findUserService({ email, password });

  const updatedHashedPass = await hashPassword(newPassword);

  const result = await db
    .update(UsersTable)
    .set({ password: updatedHashedPass })
    .where(eq(UsersTable.id, user.id))
    .returning({ userId: UsersTable.id }); // returning to prevent race condition by responsing accordingly in controller, which may occur do due large user base
  return result;
};
