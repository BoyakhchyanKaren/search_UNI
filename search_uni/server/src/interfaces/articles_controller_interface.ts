import { NextFunction, Request, Response } from "express";

export interface Articles_controller_interface {
    getAllArticles: (req: Request, res: Response, next: NextFunction) => object,
    createArticle: (req: Request, res: Response, next: NextFunction) => object,
    deleteArticle: (req: Request, res: Response, next: NextFunction) => object,
}