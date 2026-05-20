import type { Request, Response } from 'express';
import {
  createContentShareLinkFunc,
  dataByContentShareLinkFunc,
  deleteContentShareLinkFunc,
} from '../../services/share/contentShareService';
import AppError from '../../middlewares/appError';

const createORdeleteShareLink = async (req: Request, res: Response) => {
  const share = req.body.share;
  if (share === undefined) throw new AppError('Share input not found', 404, 'Not found');
  const contentId = req.contentId;
  console.log(contentId);
  if (share === true) {
    await createContentShareLinkFunc(contentId, false); // not new content
    return res.json({ message: 'Share link generated' });
  } else {
    await deleteContentShareLinkFunc(contentId);
    res.json({ message: 'Share link deleted' });
  }
};

const sharedContent = async (req: Request, res: Response) => {
  const content_share_Hash = Array.isArray(req.params.content_share_hash)
    ? req.params.content_share_hash[0]
    : req.params.content_share_hash;

  if (!content_share_Hash) throw new AppError('Link not found', 404, 'NotFound');

  const result = await dataByContentShareLinkFunc(content_share_Hash);
  return res.status(200).json({
    result: result[0], // it  return an array in which there will be the found data
    message: 'Shared content fetched successfully',
  });
};

export const contentShareController = { sharedContent, createORdeleteShareLink };
