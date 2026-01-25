import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
export declare const handleZodError: (err: ZodError) => {
    statusCode: StatusCodes;
    message: string;
    errorSources: {
        path: PropertyKey | undefined;
        message: string;
    }[];
};
