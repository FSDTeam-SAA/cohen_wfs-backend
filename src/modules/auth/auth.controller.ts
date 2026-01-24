import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { AuthService } from './auth.service.js';
// Change this line:
import config from '../../config/index.js';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, accessToken, user } = result;

    // Set Refresh Token in Cookie (Optional if VPS is strict, but good for local)
    res.cookie('refreshToken', refreshToken, {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken,
            refreshToken, // Now explicitly sent to the frontend
            user,
        },
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Access token retrieved successfully!',
        data: result,
    });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.forgotPassword(email);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OTP sent to your email! Please check your inbox.',
        data: null,
    });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const result = await AuthService.verifyOTP(email, otp);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OTP verified successfully!',
        data: result,
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, newPassword, confirmPassword   } = req.body;

    await AuthService.resetPasswordFromDB( accessToken, {newPassword, confirmPassword});

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Password reset successful! You can now log in.',
        data: null,
    });
});

export const AuthController = {
    loginUser,
    refreshToken, // Add this
    forgotPassword,
    verifyOTP,
    resetPassword
};

