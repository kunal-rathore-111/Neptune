import crypto from 'crypto';
import { db } from '../../config/dbDrizzle';
import { ContentShareLinkTable, ContentTable, UserShareLinkTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import AppError from '../../middlewares/appError';

const hashLink = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const createContentShareLinkFunc = async (contentId: string, isNewContent: boolean) => {
  // First, check if user already has a share link if not new content
  if (!isNewContent) {
    const existingLink = await db
      .select()
      .from(ContentShareLinkTable)
      .where(eq(ContentShareLinkTable.contentId, contentId));
    // If link exists, return the existing hash instead of creating a new one
    if (existingLink.length > 0 && existingLink[0]) {
      return;
    }
  }
  // If no link exists or new content then create a new one
  const contentSharehash = hashLink();
  const result = await db
    .insert(ContentShareLinkTable)
    .values({
      contentSharehash,
      contentId,
    })
    .returning({ UserShareLinkTableId: UserShareLinkTable.id });
  if (result[0]?.UserShareLinkTableId) return contentSharehash;
  else throw new AppError('Content share link not created, please try again later', 500, 'Server Error');
};

export const deleteContentShareLinkFunc = async (contentId: string) => {
  const result = await db
    .delete(ContentShareLinkTable)
    .where(eq(ContentShareLinkTable.contentId, contentId))
    .returning({ ContentShareLinkTableId: ContentShareLinkTable.id });
  return;
};

export const dataByContentShareLinkFunc = async (content_share_Hash: string) => {
  console.error('\n\n\n\n\n', content_share_Hash, '\n\n\n');
  const result = await db
    .select({
      contentTable: {
        id: ContentTable.id,
        title: ContentTable.title,
        description: ContentTable.description,
        link: ContentTable.link,
        category: ContentTable.link,
        tags: ContentTable.tags,
        createdDate: ContentTable.createdDate,
        updatedDate: ContentTable.updatedDate
      },
      ContentShareLinkTable: {
        id: ContentShareLinkTable.id,
        sharehash: ContentShareLinkTable.contentSharehash,
        contentId: ContentShareLinkTable.contentId,
      }
    })
    .from(ContentShareLinkTable)
    .innerJoin(ContentTable, eq(ContentShareLinkTable.contentId, ContentTable.id))
    .where(eq(ContentShareLinkTable.contentSharehash, content_share_Hash));
  console.log('\n\n', result, '\n\n');
  if (!result.length) throw new AppError('Content not found', 404, 'Not found');
  return result;
};
