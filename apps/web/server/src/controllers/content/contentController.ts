import type { Request, Response } from 'express';
import {
  addContentService,
  deleteContentService,
  getContentService,
  updateContentService,
} from '../../services/content/contentService';

export const dashboard = async (req: Request, res: Response) => {
  const userId = req.userId;
  const limit = 12; // fetch 12 data every time
  const cursor = (req.query.cursor && req.query.cursor !== 'undefined') ? (req.query.cursor as string) : undefined; //for first query no cursor

  const data = await getContentService(userId, cursor, limit);
  // now if data's length > limit means more possible and drop the last row (extra row) from data too

  const hasMoreContent = data.length > limit;

  const finalData = hasMoreContent ? data.filter((item, idx) => idx < limit) : data;

  const nextCursor = hasMoreContent ? finalData[finalData.length - 1]?.contentTable.updatedDate : undefined; // last cursor track

  console.error(nextCursor)

  res.status(200).json({
    message: 'Dashboard fetched successfully',
    data: finalData,
    pagination: {
      hasMoreContent,
      nextCursor
    }

  });
};

const addContent = async (req: Request, res: Response) => {
  const userId = req.userId;

  await addContentService(req.body, userId);
  res.status(200).json({
    message: 'Content added',
  });
};

const deleteContent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const contentId = req.contentId;

  await deleteContentService({ userId, contentId });
  // handles if content deleted -- because drizzle throwing error if no data found on deleting

  return res.status(200).json({
    message: 'Deleted',
  });
};

const updateContent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const contentId = req.contentId;
  const newColumnData = req.body;

  await updateContentService({ userId, contentId, newColumnData });
  return res.status(200).json({
    message: 'Content updated',
  });
};

export const contentController = { dashboard, addContent, deleteContent, updateContent };
