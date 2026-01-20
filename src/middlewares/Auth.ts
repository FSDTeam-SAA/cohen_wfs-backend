import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../errors/AppError.js';
import { User } from '../modules/user/user.model.js';
import { TUserRole } from '../modules/user/user.interface.js';

const Auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // 1. Check if token is sent
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
        }

        // 2. Verify token
        let decoded;
        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET as string
            ) as JwtPayload;
        } catch (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is invalid or expired!');
        }

        const { role, email, iat } = decoded;

        // 3. Check if user exists in DB
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
        }

        // 4. Check if user is deleted
        if (user.isDeleted) {
            throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
        }

        // 5. Check role authorization
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized to access this route!');
        }

        // 6. Attach user to request object (Using your index.d.ts definition)
        req.user = decoded as JwtPayload;
        next();
    });
};

export default Auth;