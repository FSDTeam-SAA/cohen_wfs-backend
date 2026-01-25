import { TLoginUser } from "./auth.interface.js";
export declare const AuthService: {
    loginUser: (payload: TLoginUser) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            firstName: string;
            lastName: string;
            email: string;
            role: import("../user/user.interface.js").TUserRole;
        };
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    forgotPassword: (email: string) => Promise<null>;
    verifyOTP: (email: string, otp: string) => Promise<{
        message: string;
        accessToken: string;
    }>;
    resetPasswordFromDB: (accessToken: string, payload: {
        newPassword: string;
        confirmPassword: string;
    }) => Promise<{
        message: string;
    }>;
    resendOTP: (email: string) => Promise<{
        message: string;
    }>;
};
