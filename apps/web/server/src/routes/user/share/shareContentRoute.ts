


import express from "express";
import { Content_MW } from "../../../middlewares/contentMiddleware"
import { contentShareController } from "../../../controllers/share/contentShareController";
import { authMiddleware } from "../../../middlewares/authMiddleware";


export const shareContent = express();

shareContent.get('/public/:content_share_hash', contentShareController.sharedContent);

shareContent.patch('/public/update-share-link/:contentId', authMiddleware, Content_MW, contentShareController.createORdeleteShareLink);

