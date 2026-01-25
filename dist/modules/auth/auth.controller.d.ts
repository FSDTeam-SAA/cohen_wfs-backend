import { Request, Response } from 'express';
export declare const AuthController: {
    loginUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    refreshToken: (req: Request, res: Response, next: import("express").NextFunction) => void;
    forgotPassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    verifyOTP: (req: Request, res: Response, next: import("express").NextFunction) => void;
    resetPassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    resendOTP: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
