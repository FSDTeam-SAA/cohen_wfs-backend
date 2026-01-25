import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError.js';
import { handleZodError } from '../errors/handleZodError.js';
import logger from '../utils/logger.js';
const globalErrorHandler = (err, req, res, next) => {
    // 1. Set Default Values
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // 500
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    // 2. Handle Specific Error Types
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources.map(error => ({
            path: String(error.path ?? ''),
            message: error.message,
        }));
    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    // 3. Final Standardized Response
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // Only show stack trace in development mode for security
        stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map