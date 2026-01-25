import { z } from 'zod';
const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});
const refreshTokenValidationSchema = z.object({
    body: z.object({
        refreshToken: z.string().refine((value) => value !== null && value !== undefined, {
            message: 'Refresh token is required!',
            path: ['body', 'refreshToken'],
        }),
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
const resendOTPValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
    }),
});
const resetPasswordValidationSchema = z.object({
    body: z.object({
        accessToken: z.string().nonempty({ message: "Access token is required" }),
        newPassword: z.string().nonempty({ message: "New password is required" }).min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().nonempty({ message: "Confirm password is required" }),
    }),
});
export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    forgotPasswordValidationSchema,
    verifyOtpValidationSchema,
    resetPasswordValidationSchema,
    resendOTPValidationSchema
};
//# sourceMappingURL=auth.validation.js.map