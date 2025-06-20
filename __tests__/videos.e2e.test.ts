import request from 'supertest';
import express from 'express';
import {setupApp} from "../src/setup-app";
import {VideoPostDto} from "../src/videos/dto/video.post-dto";
import {HttpStatus} from "../src/core/types/http-statuses";
import {availableResolutions} from "../src/videos/types/video";

describe('Video API', () => {
    const app = express();
    setupApp(app);
    const mainUrl= '/hometask_01/api/videos';

    const testVideoData: VideoPostDto = {
        title: "The Godfather 2",
        author: "Mario Puzo",
        availableResolutions: [availableResolutions.P360, availableResolutions.P480, availableResolutions.P720, availableResolutions.P1080]
    }

    beforeAll(async () => {
        await request(app).delete('/hometask_01/api/testing/all-data').expect(HttpStatus.NoContent);
    });

    it('should create video; POST /videos', async () => {
        const newVideo: VideoPostDto = {
            ...testVideoData,
            title: "Sam's cat",
            author: 'Sam Smith',
            availableResolutions: [availableResolutions.P360, availableResolutions.P480, availableResolutions.P720],
        };

        await request(app)
            .post(mainUrl)
            .send(newVideo)
            .expect(HttpStatus.Created);
    });

    it('should return video list; GET /videos', async () => {
        await request(app)
            .post(mainUrl)
            .send({ ...testVideoData, name: 'Another video' })
            .expect(HttpStatus.Created);

        await request(app)
            .post(mainUrl)
            .send({ ...testVideoData, name: 'Another video2' })
            .expect(HttpStatus.Created);

        const videoListResponse = await request(app)
            .get(mainUrl)
            .expect(HttpStatus.Ok);

        expect(videoListResponse.body).toBeInstanceOf(Array);
        expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should return video by id; GET /videos/:id', async () => {
        const createResponse = await request(app)
            .post(mainUrl)
            .send({ ...testVideoData, name: 'Another video' })
            .expect(HttpStatus.Created);

        const getResponse = await request(app)
            .get(mainUrl+`/${createResponse.body.id}`)
            .expect(HttpStatus.Ok);

        expect(getResponse.body).toEqual({
            ...createResponse.body,
            id: expect.any(Number),
            createdAt: expect.any(String),
        });
    });
});