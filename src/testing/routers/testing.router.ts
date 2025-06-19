import { Router, Request, Response } from 'express';
import { db } from '../../core/db/mock-db-data';
import { HttpStatus } from '../../core/types/http-statuses';

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent);
});