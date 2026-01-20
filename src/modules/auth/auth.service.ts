import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError.js';
import { User } from '../user/user.model.js';
import { TLoginUser, TResetPassword } from './auth.interface.js';
import config from '../../config/index.js';
import { createToken } from './auth.utils.js'; // Import the utility
import jwt, { JwtPayload } from 'jsonwebtoken';
import { emailTemplates } from '../../utils/emailTemplates.js';
import sendEmail from '../../utils/sendEmail.js';


// declare const jwt: typeof import('jsonwebtoken');

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password as string);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not match!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // 1. Create Access Token
  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string
  );

  // 2. Create Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.refreshTokenSecret as string,
    config.jwtRefreshTokenExpiresIn as string
  );

  return {
    accessToken,
    refreshToken,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshToken = async (token: string) => {
  // 1. Verify the token with error logging
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.refreshTokenSecret as string
    ) as JwtPayload;
  } catch (err: any) {
    // This log is for you in the terminal
    console.error("JWT Verification Error:", err.message);
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Refresh token is invalid or expired!');
  }

  const { email } = decoded;

  // 2. Check if user exists (Senior check: ensures token belongs to a real user)
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // 3. Check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  // 4. Create new Access Token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string
  );

  return {
    accessToken,
  };
};


// STEP 1: Forgot Password - Generates and sends OTP
const forgotPassword = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  if (user.isDeleted) throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted!');

  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Update using the new field names: otp and otpExpires
  await User.findByIdAndUpdate(
    user._id,
    {
      otp: generatedOtp,
      otpExpires: otpExpires,
    },
    { new: true, runValidators: true }
  );

  const html = emailTemplates.otpEmail(generatedOtp);

  try {
    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Verify your Witklip account',
      html: html,
    });

    if (!emailResult.success) {
      throw new Error(emailResult.error);
    }
  } catch (error: any) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to send verification email: ${error.message}`
    );
  }

  return null;
};

// STEP 2: Verify OTP
const verifyOTP = async (email: string, otp: string) => {
  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');

  // Check against the unified 'otp' and 'otpExpires' fields
  const isMatch = user.otp === otp;
  const isExpired = user.otpExpires && new Date() > user.otpExpires;

  if (!isMatch || isExpired) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid or expired code!');
  }

  return null;
};

// STEP 3: Reset Password - Updates DB and clears OTP
const resetPassword = async (payload: {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const { email, otp, newPassword, confirmPassword } = payload;

  if (newPassword !== confirmPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Passwords do not match!');
  }

  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');

  // Final security check of the OTP before updating password
  const isMatch = user.otp === otp;
  const isExpired = user.otpExpires && new Date() > user.otpExpires;

  if (!isMatch || isExpired) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid or expired code!');
  }

  // Update the password - The pre-save hook in your model will hash this automatically
  user.password = newPassword;

  // Clear the OTP fields so they cannot be reused
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  return null;
};




export const AuthService = {
  loginUser,
  refreshToken,
  forgotPassword,
  verifyOTP,
  resetPassword
};

