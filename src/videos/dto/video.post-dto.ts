import {availableResolutions} from "../types/video";

export type VideoPostDto = {
    title: string;
    author: string;
    availableResolutions: availableResolutions[]
}