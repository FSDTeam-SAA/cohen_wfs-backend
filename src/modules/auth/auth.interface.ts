export type TLoginUser = {
    email: string;
    password: string;
};

export type TResetPassword = {
  email: string;
  otp: string;
  newPassword: string;
};