import express, { Request, Response, Express, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { HttpError } from './exceptions/HttpError';
import { errorHandler } from './exceptions/errorHandler';
import {articleRouter} from "./routes/articleRoutes";

export const getApplication = (): Express => {
    const app = express()
        .use(express.json())
        .use(cors({origin: '*'}))
        .use(helmet())
        .use(morgan('dev'))
        .use(compression())
        .use("/articles", articleRouter)
        .get('/', (req: Request, res: Response) => {
            res.send("<h1>Article Page</h1>");
        })
        .all('*', (req: Request, res: Response, next: NextFunction) => {
            next(HttpError.notFound(`Can't find ${req.originalUrl} on this server!`));
        })
        .use(errorHandler);
    return app;
};