import {VideoInputDto} from "../dto/video.input-dto";
import {ValidationError} from "../types/validationError";
import {availableResolutions} from "../types/video";

export const videoInputDtoValidation = (
    data: VideoInputDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title || typeof  data.title !== 'string'
        ||data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }

    if (
        !data.author || typeof  data.author !== 'string'
        ||data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be array',
        });
    } else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'availableResolutions',
                message: 'Invalid availableResolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({
                    field: 'resolution',
                    message: 'Invalid availableResolutions:' + resolution,
                });
                break;
            }
        }
    }

    return errors;
};