import express, { Express, Request, Response } from 'express';
import { driversRouter } from './videos/routers/videos.router';
import { testingRouter } from './testing/routers/testing.router';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('hello world!!!');
    });

    app.use('/hometask_01/api/videos', driversRouter);
    app.use('/hometask_01/api/testing', testingRouter);

    return app;
};