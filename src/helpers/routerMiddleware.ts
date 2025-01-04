import { Lifecycle } from '@hapi/hapi';
import { ValidationError } from 'joi';
import { ApplicationValidationError } from './applicationError';

/**
 * Capture errors for request validation and return the error in a correct format
 */
export const ValidationHandlerMiddleware: Lifecycle.FailAction = (request, h, err) => {
    if (err instanceof ValidationError) {
        const fieldErrors = err.details ?? [];
        if (!fieldErrors.length) return h.continue;
        throw new ApplicationValidationError(fieldErrors);
    }

    return h.continue;
};
