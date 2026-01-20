import { StatusCodes } from 'http-status-codes';
import { TUser } from './user.interface.js';
import { User } from './user.model.js';
import AppError from '../../errors/AppError.js';

const createAccountIntoDB = async (payload: TUser) => {
    // 1. Conflict Check
    const isUserExists = await User.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError(StatusCodes.CONFLICT, 'User with this email already exists!');
    }

    // 2. Prepare Payload 
    // We explicitly set isVerified: true because you want them to login immediately
    const userData: Partial<TUser> = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password as string,
        isVerified: true, 
        isDeleted: false,
    };

    // 3. Save (The Model Hook will handle bcrypt hashing)
    const result = await User.create(userData);

    // 4. Return sanitized object (Remove password)
    const sanitizedUser = result.toObject();
    delete sanitizedUser.password;

    return sanitizedUser;
};

export const UserService = {
    createAccountIntoDB,
};