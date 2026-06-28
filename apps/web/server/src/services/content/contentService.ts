import { and, desc, eq, lt } from 'drizzle-orm';
import { getDB } from "@repo/database";
import { ContentShareLinkTable, ContentTable } from '@repo/database';
import type { z } from 'zod';
import type { contentZodSchema } from '@repo/validation';
import { createContentShareLinkFunc, deleteContentShareLinkFunc } from '../share/contentShareService';
import AppError from '../../middlewares/appError';
import { getEmbedding } from './embeddingService';




export const getContentService = async (userId: string, cursor: string | undefined, limit: number) => {

  const db = getDB();
  const data = await db
    .select(
      {
        // all data except the embeddings
        contentTable: {
          id: ContentTable.id,
          userId: ContentTable.userId,
          title: ContentTable.title,
          link: ContentTable.link,
          description: ContentTable.description,
          category: ContentTable.category,
          tags: ContentTable.tags,
          createdDate: ContentTable.createdDate,
          updatedDate: ContentTable.updatedDate,
        },
        ContentShareLinkTable: {
          id: ContentShareLinkTable.id,
          shareHash: ContentShareLinkTable.contentSharehash,
          contentId: ContentShareLinkTable.contentId
        }
      })
    .from(ContentTable)
    .leftJoin(ContentShareLinkTable,
      eq(ContentShareLinkTable.contentId, ContentTable.id))
    .where(
      and(
        eq(ContentTable.userId, userId),
        cursor ? lt(ContentTable.updatedDate, new Date(cursor)) : undefined //if cursor exists then find data less then the cursor date
      )
    )
    .orderBy(desc(ContentTable.updatedDate))
    .limit(limit + 1);
  //console.log('\n\n\n', data, '\n\n\n');
  return data;
};

export const addContentService = async (data: z.infer<typeof contentZodSchema>, userId: string) => {

  // getEmbeddings
  const embedding = await getEmbedding(data);
  const db = getDB();


  console.log('\nDB addContentDBFunction called\n');

  const { title, description, link, tags, category, share } = data;
  //console.log('\n\n\n\n', share, '\n\n\n\n');
  const result = await db
    .insert(ContentTable)
    .values(
      { title, description, link, tags, category, userId, embedding }, // if description or tags are undefined then drizzle wrap them as null in database cause they are not defined as notNull in schema
    )
    .returning({ contentId: ContentTable.id });

  if (result[0]?.contentId) {
    const isNewContent = true;
    if (share) await createContentShareLinkFunc(result[0]?.contentId, isNewContent);
    return;
  }
  // means something gone wrong throw error
  else {
    throw new AppError('Something went wrong while adding new content', 500, 'DB error', true);
  }
};

interface deleteContent_DTO {
  userId: string;
  contentId: string;
}

export const deleteContentService = async ({ userId, contentId }: deleteContent_DTO) => {
  const db = getDB();
  console.log('\nDB deleteContentDBFunction called\n');
  const result = await db
    .delete(ContentTable)
    .where(and(eq(ContentTable.userId, userId), eq(ContentTable.id, contentId)))
    .returning({ userId: ContentTable.userId });

  if (!result[0]?.userId) throw new AppError('Content not found', 404, 'Not found');
  else return;
};

interface updateContent_DTO extends deleteContent_DTO {
  userId: string;
  contentId: string;
  newColumnData: z.infer<typeof contentZodSchema>;
}
/* need to add share update logic */
export const updateContentService = async ({ userId, contentId, newColumnData }: updateContent_DTO) => {


  // getEmbeddings
  const embedding = await getEmbedding(newColumnData);

  const { title, description, link, category, tags, share } = newColumnData;
  console.log('\nDB updateContentDBFunction called\n');
  const updatedDate = new Date();
  const db = getDB();

  const result = await db
    .update(ContentTable)
    .set({ title, description, link, category, tags, updatedDate, embedding })
    .where(and(eq(ContentTable.userId, userId), eq(ContentTable.id, contentId)))
    .returning({ contentId: ContentTable.id });

  if (result[0]?.contentId) {
    if (share) {
      await createContentShareLinkFunc(contentId, false);
    } else {
      await deleteContentShareLinkFunc(contentId);
    }
  } else {
    throw new AppError('Something went wrong while adding new content', 500, 'DB error', true);
  }
};
