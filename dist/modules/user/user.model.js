import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { USER_ROLE } from "./user.constant.js";
const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.CUSTOMER
    },
    isVerified: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    passwordChangedAt: { type: Date },
    otp: { type: String, default: null, select: false },
    otpExpires: { type: Date, default: null, select: false },
}, { timestamps: true });
// [Senior Fix] Using async/await without the 'next' callback to avoid TypeScript overload errors
userSchema.pre('save', async function () {
    const user = this;
    // 1. Check if password is modified
    if (!user.isModified('password')) {
        return; // Just return, Mongoose moves forward automatically
    }
    // 2. Hash the password
    user.password = await bcrypt.hash(user.password, 10);
    // No next() needed here!
});
userSchema.statics.isUserExistsByEmail = async function (email) {
    return await this.findOne({ email }).select('+password +otp +otpExpires');
};
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
export const User = model('User', userSchema);
//# sourceMappingURL=user.model.js.map