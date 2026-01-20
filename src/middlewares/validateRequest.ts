import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import catchAsync from '../utils/catchAsync.js';

const validateRequest = (schema: z.ZodTypeAny) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // We use parseAsync so we can eventually add async database checks 
        // inside our Zod schemas (e.g., checking if email is already in use)
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
            query: req.query,
            params: req.params,
        });

        next();
    });
};

export default validateRequest;