import {ValidationError} from "../types/validationError";
import {availableResolutions, Video} from "../types/video";

export const videoPutDtoValidation = (
    data: Video,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title || data.title.trim().length < 2 ||
        data.title.trim().length > 40 || typeof data.title !=="string"
    ) {
        errors.push({ message: "Invalid title", field: 'title'});
    }

    if (
        !data.author || data.author.trim().length < 2 ||
        data.author.trim().length > 20 || typeof data.author !=="string"
    ) {
        errors.push({ message: "Invalid author", field: 'author' });
    }
    if (
        !data.canBeDownloaded || typeof data.canBeDownloaded !=="boolean"
    ) {
        errors.push({ message: "invalid value of canBeDownloaded", field: 'canBeDownloaded',});
    }
    if (
        !data.minAgeRestriction || typeof data.minAgeRestriction !=="number" ||
        data.minAgeRestriction <1 || data.minAgeRestriction >18
    ) {
        errors.push({ message: "invalid value of canBeDownloaded", field: 'canBeDownloaded',});
    }


    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            message: "Invalid available resolutions",
            field: 'availableResolutions',
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                message: "Invalid available resolutions",
                field: 'availableResolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    message: "Invalid type of resolution",
                    field: 'availableResolutions',
                });
                break;
            }
        }
    }

    return errors;
};