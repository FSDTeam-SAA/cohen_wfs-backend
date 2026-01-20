export const emailTemplates = {
    // Template for Forgot Password / Account Verification OTP
    otpEmail: (otp: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4CAF50;">Witklip</h1>
            </div>
            <h2 style="color: #333;">Verify Your Account</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">Use the following 6-digit code to complete your verification process. This code is valid for 10 minutes.</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; border: 2px dashed #4CAF50; padding: 10px 20px; border-radius: 4px;">
                    ${otp}
                </span>
            </div>
            <p style="color: #999; font-size: 12px;">If you did not request this code, please ignore this email or contact support if you have concerns.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px; text-align: center;">&copy; 2026 Witklip. All rights reserved.</p>
        </div>
    `,

    // Template for Password Reset Confirmation
    resetSuccess: () => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #4CAF50;">Password Changed Successfully</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">This is a confirmation that the password for your Witklip account has been successfully changed.</p>
            <p style="color: #555; font-size: 16px;">If you did not make this change, please contact our security team immediately.</p>
            <p style="color: #aaa; font-size: 12px; margin-top: 30px;">&copy; 2026 Witklip. All rights reserved.</p>
        </div>
    `
};