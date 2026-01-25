export declare const emailTemplates: {
    otpEmail: (otp: string) => string;
    resetSuccess: () => string;
    enquiryNotification: (enquiry: any) => string;
    contactNotification: (payload: any) => string;
    customerAcknowledgement: (fullName: string) => string;
    resendOtp: (otp: string) => string;
};
