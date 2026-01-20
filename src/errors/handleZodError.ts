import { ZodError, ZodIssue } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const handleZodError = (err: ZodError) => {
    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    return {
        statusCode: StatusCodes.BAD_REQUEST, // 400
        message: 'Validation Error',
        errorSources,
    };
};