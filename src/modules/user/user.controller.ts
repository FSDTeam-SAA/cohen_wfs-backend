import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';

const createAccount = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAccountIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Registration successful! Please login to continue.',
        data: result,
    });
});

export const UserController = {
    createAccount,
};