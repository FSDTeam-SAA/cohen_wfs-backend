import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
import { AuthController } from './auth.controller.js';


const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthController.refreshToken
);

router.post(
    '/forgot-password',
    validateRequest(AuthValidation.forgotPasswordValidationSchema),
    AuthController.forgotPassword
);

router.post(
    '/verify-otp',
    validateRequest(AuthValidation.verifyOtpValidationSchema),
    AuthController.verifyOTP
);

router.post(
    '/reset-password',
    validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetPassword);


export const AuthRoutes = router;