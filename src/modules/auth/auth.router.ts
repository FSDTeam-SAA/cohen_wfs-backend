import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
import { AuthController } from './auth.controller.js';
import { RateLimiter } from '../../middlewares/rateLimiter.js';


const router = express.Router();

router.post(
    '/login',
    RateLimiter.authLimiter,
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    RateLimiter.authLimiter,
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthController.refreshToken
);

router.post(
    '/forgot-password',
    RateLimiter.mailLimiter,
    validateRequest(AuthValidation.forgotPasswordValidationSchema),
    AuthController.forgotPassword
);

router.post(
    '/verify-otp',
    RateLimiter.otpLimiter,
    validateRequest(AuthValidation.verifyOtpValidationSchema),
    AuthController.verifyOTP
);

router.post(
    '/reset-password',
    RateLimiter.authLimiter,
    validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetPassword);


export const AuthRoutes = router;