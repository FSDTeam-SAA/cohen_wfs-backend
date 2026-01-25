import { z } from 'zod';
export declare const AuthValidation: {
    loginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    refreshTokenValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            refreshToken: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    forgotPasswordValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    verifyOtpValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            otp: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    resetPasswordValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            accessToken: z.ZodString;
            newPassword: z.ZodString;
            confirmPassword: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    resendOTPValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
