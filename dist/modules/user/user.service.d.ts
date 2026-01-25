import { TUser } from './user.interface.js';
export declare const UserService: {
    createAccountIntoDB: (payload: TUser) => Promise<TUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
