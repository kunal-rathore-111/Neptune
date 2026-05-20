import type { RequestHandler } from "express";


export const asyncWrapper = (func: RequestHandler): RequestHandler => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
}