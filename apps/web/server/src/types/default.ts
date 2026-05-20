//  express request
declare module "express-serve-static-core" {
    interface Request {
        requestId: string;
        userId: string;
        contentId: string;
        userQuery: string;
        chatHistory: string;
    }
}