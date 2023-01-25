import {body} from "express-validator";

export const createArticleDto = [
    body("content")
        .isString()
        .notEmpty()
        .withMessage("Not valid content for article"),
]

export const updateArticleDto = [
    body("heading")
        .isString()
        .notEmpty()
        .withMessage("not valid heading for article")
]