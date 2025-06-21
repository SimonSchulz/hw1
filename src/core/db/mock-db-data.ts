import {availableResolutions, Video} from "../../videos/types/video";
const date = new Date();
const oneDayToMilliseconds = 60*60*24*1000;
export const createdDate = date.toISOString();
export const publicationDate = new Date(date.getTime()+oneDayToMilliseconds).toISOString();
export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: "The Dark Knight",
            author: "Jonathan Nolan",
            canBeDownloaded: false,
            minAgeRestriction: 17,
            createdAt: createdDate,
            publicationDate: publicationDate,
            availableResolutions: [availableResolutions.P360, availableResolutions.P480, availableResolutions.P720, availableResolutions.P1080]
        },
        {
            id: 2,
            title: "The Godfather",
            author: "Mario Puzo",
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: createdDate,
            publicationDate: publicationDate,
            availableResolutions: [availableResolutions.P360, availableResolutions.P480, availableResolutions.P720, availableResolutions.P1080]
        },
        {
            id: 3,
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            canBeDownloaded: false,
            minAgeRestriction: 12,
            createdAt: createdDate,
            publicationDate: publicationDate,
            availableResolutions: [availableResolutions.P360, availableResolutions.P480, availableResolutions.P720, availableResolutions.P1080]
        },
    ],
};