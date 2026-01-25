export const emailTemplates = {
    // Template for Forgot Password / Account Verification OTP
    otpEmail: (otp) => `
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
    `,
    // Add this inside your emailTemplates object
    enquiryNotification: (enquiry) => `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2e7d32; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 1px;">WITKLIP AGRICULTURE</h1>
        </div>
        
        <div style="padding: 25px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #4CAF50; display: inline-block;">New Business Enquiry</h2>
            <p style="color: #666; font-size: 14px; line-height: 1.5;">A new request has been captured by the system. Please review the details below for follow-up:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <thead>
                    <tr style="background-color: #f4f4f4; text-align: left;">
                        <th style="padding: 12px; border: 1px solid #e0e0e0; color: #555;">Field</th>
                        <th style="padding: 12px; border: 1px solid #e0e0e0; color: #555;">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Enquiry ID</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #2e7d32; font-weight: bold;">${enquiry.enquiryId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Product</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${enquiry.productInterest}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Customer</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${enquiry.fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Email</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${enquiry.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Company</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${enquiry.companyName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Priority</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">
                            <span style="background-color: ${enquiry.priority === 'High' ? '#d32f2f' : '#2e7d32'}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; text-transform: uppercase;">
                                ${enquiry.priority}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Message</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; line-height: 1.4;">${enquiry.message}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 11px;">
                Witklip Agriculture Portal &copy; 2026 | Admin Notification System
            </p>
        </div>
    </div>
`,
    // Template for Contact Form Submissions (Admin Notification)
    contactNotification: (payload) => `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2e7d32; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 1px;">WITKLIP AGRICULTURE</h1>
        </div>
        
        <div style="padding: 25px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #4CAF50; display: inline-block;">New Contact Submission</h2>
            <p style="color: #666; font-size: 14px; line-height: 1.5;">A new contact request has been received from the website. Details below:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <thead>
                    <tr style="background-color: #f4f4f4; text-align: left;">
                        <th style="padding: 12px; border: 1px solid #e0e0e0; color: #555;">Field</th>
                        <th style="padding: 12px; border: 1px solid #e0e0e0; color: #555;">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Category</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; color: #2e7d32; font-weight: bold;">${payload.category}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Full Name</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${payload.fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Email</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${payload.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Phone</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${payload.phoneNumber || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Location</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${payload.location}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Company</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0;">${payload.companyName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: 600; color: #444;">Message</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; line-height: 1.4;">${payload.message}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 11px;">
                Witklip Agriculture Portal &copy; 2026 | Admin Notification System
            </p>
        </div>
    </div>
    `,
    customerAcknowledgement: (fullName) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2e7d32;">WITKLIP</h1>
        </div>
        <h2 style="color: #333;">Thank you for reaching out, ${fullName}!</h2>
        <p style="color: #555; font-size: 16px;">We have received your enquiry and our team is currently reviewing it.</p>
        <p style="color: #555; font-size: 16px;">One of our representatives will get back to you within 24-48 business hours.</p>
        <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #2e7d32;">
            <p style="margin: 0; color: #555;"><b>Reference:</b> Our team has logged your request in our system.</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #aaa; font-size: 12px; text-align: center;">This is an automated response. Please do not reply to this email.</p>
        <p style="color: #aaa; font-size: 12px; text-align: center;">&copy; 2026 Witklip Agriculture. All rights reserved.</p>
    </div>
    `,
    // Template for Resending OTP
    resendOtp: (otp) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #4CAF50;">Witklip</h1>
        </div>
        <h2 style="color: #333;">New Verification Code</h2>
        <p style="color: #555; font-size: 16px;">Hello,</p>
        <p style="color: #555; font-size: 16px;">We received a request for a new verification code. Please use the 6-digit code below to continue. <b>This code replaces any previous codes sent to you.</b></p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; border: 2px dashed #4CAF50; padding: 10px 20px; border-radius: 4px;">
                ${otp}
            </span>
        </div>
        <p style="color: #555; font-size: 14px;">This code is valid for 10 minutes.</p>
        <p style="color: #999; font-size: 12px;">If you did not request a new code, please ensure your account is secure.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #aaa; font-size: 12px; text-align: center;">&copy; 2026 Witklip. All rights reserved.</p>
    </div>
`,
};
//# sourceMappingURL=emailTemplates.js.map