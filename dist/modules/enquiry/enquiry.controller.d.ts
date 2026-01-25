import { Request, Response } from 'express';
export declare const EnquiryController: {
    createEnquiry: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllEnquiries: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getEnquiryStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    exportEnquiries: (req: Request, res: Response, next: import("express").NextFunction) => void;
    delteEnquiry: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateEnquirystatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getSingleEnquiry: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
