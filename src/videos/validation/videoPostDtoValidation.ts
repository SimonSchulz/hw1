import {VideoPostDto} from "../dto/video.post-dto";
import {ValidationError} from "../types/validationError";
import {availableResolutions} from "../types/video";

export const videoPostDtoValidation = (
    data: VideoPostDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title || data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: "Invalid Title" });
    }

    if (
        !data.author || data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: "Invalid Author" });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            message: "Invalid available resolutions",
            field: 'availableResolutions'
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                message: "Invalid available Resolutions",
                field: 'availableResolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    message: "Invalid Resolution",
                    field: 'availableResolutions',
                });
                break;
            }
        }
    }

    return errors;
};