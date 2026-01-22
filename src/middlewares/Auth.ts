import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../errors/AppError.js';
import { User } from '../modules/user/user.model.js';
import { TUserRole } from '../modules/user/user.interface.js';

const Auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        // 1. Check if token is sent and follows Bearer schema
        // FIX: This solves your Postman "invalid token" error
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized! Please login.');
        }

        const token = authHeader.split(' ')[1];

        // 2. Verify token
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(
                token as string,
                process.env.JWT_ACCESS_SECRET as string
            ) as JwtPayload;
        } catch (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is invalid or expired!');
        }

        const { role, email, iat } = decoded;

        // 3. Check if user exists in DB
        const user = await User.isUserExistsByEmail(email); // Using a static method is cleaner

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'The user belonging to this token no longer exists!');
        }

        // 4. Check if user is deleted
        if (user?.isDeleted) {
            throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
        }

        // 5. Check if user is blocked
        if (user && 'status' in user) {
            if ((user as { status: string }).status === 'blocked') {
                throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
            }
        }

        // 6. Security: Check if password was changed after the token was issued
        // This ensures that if a password is reset, old tokens are instantly killed
        if (
            user.passwordChangedAt &&
            User.isJWTIssuedBeforePasswordChanged(
                user.passwordChangedAt,
                iat as number
            )
        ) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Password recently changed! Please login again.');
        }

        // 7. Check role authorization
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You do not have permission to access this route!');
        }

        // 8. Attach user to request object
        req.user = decoded;
        next();
    });
};

export default Auth;