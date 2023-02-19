import { Router } from "express";
import { ArticleController } from "../controllers/articleController";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { createArticleDto } from "../dtos/article.dtos";


export const articleRouter = Router();

articleRouter
        .get("/", ArticleController.getAllArticles)
        .post("/", ArticleController.createArticle);

articleRouter
        .delete("/:id", ArticleController.deleteArticle)
        .put("/:id", ArticleController.editArticle);