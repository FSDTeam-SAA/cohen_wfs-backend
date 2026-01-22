import { HydratedDocument, Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant.js';

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface TUser {
    _id?: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: TUserRole;
    isVerified: boolean;
    isDeleted: boolean;
    // Simple OTP system
    otp?: string | null;
    otpExpires?: Date | null;
    status: string;
    passwordChangedAt?: Date;
}

export interface UserModel extends Model<TUser> {
    isJWTIssuedBeforePasswordChanged(passwordChangedAt: Date, arg1: number): unknown;
    isUserExistsByEmail(email: string): Promise<HydratedDocument<TUser> | null>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}