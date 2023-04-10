import { Router } from "express";
import { ArticleController } from "../controllers/articleController";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { createArticleDto } from "../dtos/article.dtos";


export const articleRouter = Router();

articleRouter
        .get("/", ArticleController.getAllArticles)
        .get("/descriptions", ArticleController.getDescriptions)
        .post("/", ArticleController.createArticle)
        .post("/descriptions", ArticleController.addDescriptions);

articleRouter
        .delete("/:id", ArticleController.deleteArticle)
        .put("/:id", ArticleController.editArticle);