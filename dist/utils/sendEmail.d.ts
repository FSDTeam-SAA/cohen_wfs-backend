interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}
declare const sendEmail: ({ to, subject, html }: SendEmailParams) => Promise<{
    success: boolean;
    error?: never;
} | {
    success: boolean;
    error: any;
}>;
export default sendEmail;
