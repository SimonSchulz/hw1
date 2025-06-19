import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { Video } from '../types/video';
import {createdDate, db, publicationDate} from "../../core/db/mock-db-data";
import {VideoInputDto} from "../dto/video.input-dto";
import {createErrorMessages} from "../../core/utils/error.utils";
import {videoInputDtoValidation} from "../validation/videoInputDtoValidation";

export const driversRouter = Router({});

driversRouter
    .get('', (req: Request, res: Response) => {
        res.status(200).send(db.videos);
    })

    .get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const driver = db.videos.find((d) => d.id === id);

        if (!driver) {
            res
                .status(HttpStatus.NotFound)
                .send(createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
                );
            return;
        }
        res.status(200).send(driver);
    })

    .post('', (req: Request<{}, {}, VideoInputDto>, res: Response) => {
        const errors = videoInputDtoValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            createdAt: createdDate,
            canBeDownloaded: false,
            minAgeRestriction: null,
            publicationDate: publicationDate
        };
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    })

    .put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = db.videos.findIndex((v) => v.id === id);

        if (index === -1) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
                );
            return;
        }

        const errors = videoInputDtoValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

        const driver = db.videos[index];

        driver.title = req.body.title;
        driver.author = req.body.author
        driver.canBeDownloaded = req.body.canBeDownloaded;
        driver.minAgeRestriction = req.body.minAgeRestriction;
        driver.publicationDate = req.body.publicationDate;
        driver.availableResolutions = req.body.availableResolutions;
        res.sendStatus(HttpStatus.NoContent);
    })

    .delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве, если id ни у кого не совпал, то findIndex вернёт -1.
        const index = db.videos.findIndex((v) => v.id === id);

        if (index === -1) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
                );
            return;
        }

        db.videos.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent);
    });