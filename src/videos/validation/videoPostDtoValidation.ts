import {VideoPostDto} from "../dto/video.post-dto";
import {ValidationError} from "../types/validationError";
import {availableResolutions} from "../types/video";

export const videoPostDtoValidation = (
    data: VideoPostDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title || typeof  data.title !== 'string'
        ||data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: "Any<String>" });
    }

    if (
        !data.author || typeof  data.author !== 'string'
        ||data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: "Any<String>" });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: "Any<String>",
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'availableResolutions',
                message: "Any<String>",
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'resolution',
                    message: "Any<String>",
                });
                break;
            }
        }
    }

    return errors;
};