import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError.js';
import { User } from '../user/user.model.js';
import { TLoginUser, TResetPassword } from './auth.interface.js';
import config from '../../config/index.js';
import { createToken } from './auth.utils.js'; // Import the utility
import jwt, { JwtPayload } from 'jsonwebtoken';
import sendEmail from '../../utils/sendEmail.js';
import { emailTemplates } from '../../utils/emailTemplates.js';


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
    const emailResult = await sendEmail(email, '', '', {
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
  const user = await User.findOne({ email }).select('+otp +otpExpires');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  // 1. Check if OTP exists at all
  if (!user.otp) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'No OTP requested for this account!');
  }

  // 2. Check for Match
  if (user.otp !== otp) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid verification code!');
  }

  // 3. Check for Expiry
  const currentTime = new Date();
  if (user.otpExpires && currentTime > user.otpExpires) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'The code has expired. Please request a new one.');
  }

  // 4. Clear OTP after successful verification so it can't be reused
  await User.findByIdAndUpdate(user._id, {
    $unset: { otp: 1, otpExpires: 1 }
  });

  const accessToken = createToken(
    { email: user.email, role: user.role },
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string
  );

  return { message: "OTP verified successfully", accessToken };
};

const resendOTP = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, { otp, otpExpires });

  // Generate the HTML using the new template
  const html = emailTemplates.resendOtp(otp);

  // Use the 4-argument signature to stay safe
  await sendEmail(
    user.email, // arg 1
    '',         // arg 2
    '',         // arg 3
    {           // arg 4 (params object)
      to: user.email,
      subject: 'Your New Witklip Verification Code',
      html: html,
    }
  );

  return { message: 'A new OTP has been sent to your email.' };
};



// STEP 3: Reset Password - Updates DB and clears OTP
const resetPasswordFromDB = async (accessToken: string, payload: { newPassword: string; confirmPassword: string }) => {
  const { newPassword, confirmPassword } = payload;

  if (newPassword !== confirmPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Passwords do not match!');
  }

  // 1. Decrypt the token to see who this belongs to
  let decoded;
  try {
    decoded = jwt.verify(accessToken, config.JWT_SECRET as string) as any;
  } catch (err) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired session. Please verify OTP again.');
  }

  // 2. The IDENTITY is extracted from the token (Secure)
  const email = decoded.email;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');

  // 3. Prevent setting same password
  const isSamePassword = await User.isPasswordMatched(newPassword, user.password as string);
  if (isSamePassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'New password cannot be the same as old!');
  }

  user.password = newPassword;
  user.passwordChangedAt = new Date();
  await user.save();

  return { message: "Password reset successful" };
};



export const AuthService = {
  loginUser,
  refreshToken,
  forgotPassword,
  verifyOTP,
  resetPasswordFromDB,
  resendOTP
};

