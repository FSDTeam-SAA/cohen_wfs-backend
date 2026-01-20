
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.js";
import { ZodObject } from 'zod';


const validateRequest = (schema: ZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    });
};

export default validateRequest;