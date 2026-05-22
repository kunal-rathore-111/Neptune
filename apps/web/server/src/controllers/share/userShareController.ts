import type { Request, Response } from 'express';
import {
  createShareLinkFunc,
  dataByUserShareLinkFunc,
  deleteShareLinkFunc,
  getShareLinkFunc,
} from '../../services/share/userShareLinkService';
import AppError from '../../middlewares/appError';

const createORdeleteUserShareLink = async (req: Request, res: Response) => {
  const share = req.body.share;
  if (share === undefined) throw new AppError('Share variable not found', 404, 'Not found');
  const userId = req.userId;
  //console.log(userId);
  if (share) {
    const shareHash = await createShareLinkFunc(userId);
    return res.json({ hash: shareHash, message: 'Share link created' });
  } else {
    await deleteShareLinkFunc(userId);
    res.json({ message: 'Share link deleted', hash: null });
  }
};

const getUserShareLink = async (req: Request, res: Response) => {
  const userId = req.userId;
  const shareHash = await getShareLinkFunc(userId);

  return res.status(200).json({ hash: shareHash });
};

const publicDashboard = async (req: Request, res: Response) => {
  const hash = Array.isArray(req.params.share_hash) ? req.params.share_hash[0] : req.params.share_hash;
  if (!hash) throw new AppError('Link not found', 404, 'NotFound');
  const result = await dataByUserShareLinkFunc(hash);
  return res.status(200).json({
    data: result,
  });
};

export const userShareController = { createORdeleteUserShareLink, getUserShareLink, publicDashboard };
