import { getDB, UsersTable } from '@repo/database';
import AppError from '../../middlewares/appError';
import { eq } from 'drizzle-orm';
import type { SignInTypes, SignUpTypes, UpdatePasswordTypes } from '@repo/validation';
import { decodePassword, hashPassword } from '../../libs/utils/hashFunc';

export const createUserService = async ({ name, email, password }: SignUpTypes) => {
  const hashedPassword = await hashPassword(password);
  const db = getDB();

  const user = await db
    .insert(UsersTable)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  const [newUser] = user;
  if (!newUser?.id) throw new AppError('Signup failed, Please try again later', 500, 'Database Error');
  return newUser;
};

export const findUserService = async ({ email, password }: SignInTypes) => {
  const db = getDB();
  const result = await db.select().from(UsersTable).where(
    eq(UsersTable.email, email)
  ).limit(1);

  const [user] = result;
  if (!user) throw new AppError('User not found', 404, 'NotFound');
  if (!user.password) throw new AppError("Password not found, please update password.", 404, "NotFound")

  const decodePasswordResponse = await decodePassword(password, user.password);
  if (!decodePasswordResponse) throw new AppError('Wrong password', 401, 'Unauthorized');
  return user;
};

export const fetchUserProfileService = async (userId: string) => {
  const db = getDB();
  // find the first user with that id
  const result = await db.select().from(UsersTable).where(eq(UsersTable.id, userId)).limit(1);

  const [user] = result;
  if (!user) {
    throw new AppError('User profile not found', 404, 'Not found');
  }
  return user;
};

export const deleteAccountService = async ({ email, password }: SignInTypes) => {
  // first find user with the email and password, if found then delete
  const user = await findUserService({ email, password });
  const db = getDB();
  return await db.delete(UsersTable).where(eq(UsersTable.id, user.id)).returning();
};

export const updatePasswordService = async ({ email, password, newPassword }: UpdatePasswordTypes) => {
  // first find user with the email and password, if found then updatePassword
  const user = await findUserService({ email, password });

  const updatedHashedPass = await hashPassword(newPassword);
  const db = getDB();
  const result = await db
    .update(UsersTable)
    .set({ password: updatedHashedPass })
    .where(eq(UsersTable.id, user.id))
    .returning({ userId: UsersTable.id }); // returning to prevent race condition by responsing accordingly in controller, which may occur do due large user base
  return result;
};
