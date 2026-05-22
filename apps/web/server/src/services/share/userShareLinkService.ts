import crypto from 'crypto';
import { db } from '../../config/dbDrizzle';
import { ContentTable, UserShareLinkTable, UsersTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import AppError from '../../middlewares/appError';

const hashLink = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const createShareLinkFunc = async (userId: string) => {
  // First, check if user already has a share link
  const existingLink = await db.select().from(UserShareLinkTable).where(eq(UserShareLinkTable.userId, userId));

  // If link exists, return the existing hash instead of creating a new one
  if (existingLink.length > 0 && existingLink[0]) {
    return existingLink[0].linkHash;
  }

  // If no link exists, create a new one
  const linkHash = hashLink();
  await db.insert(UserShareLinkTable).values({
    linkHash,
    userId,
  });
  return linkHash;
};

export const deleteShareLinkFunc = async (userId: string) => {
  const result = await db
    .delete(UserShareLinkTable)
    .where(eq(UserShareLinkTable.userId, userId))
    .returning({ UserShareLinkTableId: UserShareLinkTable.id });

  if (!result[0]?.UserShareLinkTableId)
    throw new AppError('No share link found to delete, please try again', 404, 'Not found');

  return;
};

export const getShareLinkFunc = async (userId: string) => {
  const existingLink = await db.select().from(UserShareLinkTable).where(eq(UserShareLinkTable.userId, userId));

  if (existingLink.length > 0 && existingLink[0]) {
    return existingLink[0].linkHash;
  }

  return null; // No link exists
};

export const dataByUserShareLinkFunc = async (linkHash: string) => {
  const data = await db
    .select({
      UsersData: UsersTable,
      ContentData: ContentTable,
    })
    .from(UserShareLinkTable)
    .innerJoin(UsersTable, eq(UserShareLinkTable.userId, UsersTable.id))
    .leftJoin(ContentTable, eq(UsersTable.id, ContentTable.userId))
    .where(eq(UserShareLinkTable.linkHash, linkHash));


  // if userDeleted then it will have nothing(so throw error), or if userExists but no content then due to leftJoin it will contain one row with UsersData and ContnentData one row having null (so if condition fails or skip)
  if (!data.length) throw new AppError('User Not Found', 404, 'NotFound');

  // it traverse array of data and every contentdata will stored in contentArray by filtering that the contentdata is not null so empty array if no data found instead null(it helps in frontend while rendering data)
  const contentArray = data.map((d) => d.ContentData).filter((d2) => d2 != null);
  return contentArray;
};
