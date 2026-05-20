
import express from "express";
import { contentZod_MW, Content_MW } from "../../../middlewares/contentMiddleware"
import { contentController } from "../../../controllers/content/contentController";

export const content = express();

content.get('/fetch', contentController.dashboard);

content.post('/add', contentZod_MW, contentController.addContent);

content.delete('/delete/:contentId', Content_MW, contentController.deleteContent);

content.patch('/update/:contentId', Content_MW, contentZod_MW, contentController.updateContent);

