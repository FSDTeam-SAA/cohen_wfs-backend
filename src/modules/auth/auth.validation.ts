import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});

const refreshTokenValidationSchema = z.object({
    body: z.object({
        refreshToken: z.string().refine(
            (value) => value !== null && value !== undefined,
            {
                message: 'Refresh token is required!',
                path: ['body', 'refreshToken'],
            }
        ),
    }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

const verifyOtpValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});



export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    forgotPasswordValidationSchema,
    verifyOtpValidationSchema,
    resetPasswordValidationSchema
};