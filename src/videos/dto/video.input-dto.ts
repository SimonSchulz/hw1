import {availableResolutions} from "../types/video";

export type VideoInputDto = {
    title: string;
    author: string;
    availableResolutions: availableResolutions[]
}