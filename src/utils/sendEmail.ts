import nodemailer from "nodemailer";
import config from "../config/index.js";

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'service' instead of host/port
        auth: {
            user: config.email.emailAddress,
            pass: config.email.emailPass, // The 16-character code: kgrdkdnpymratlwt
        },
        // Adding logger helps debug the exact moment Google says "No"
        logger: true,
        debug: true
    });

    try {
        const info = await transporter.sendMail({
            from: `"Witklip Support" <${config.email.emailAddress}>`,
            to,
            subject,
            html,
        });

        console.log("✔ Message sent: %s", info.messageId);
        return { success: true };
    } catch (error: any) {
        console.error("✘ SMTP Error Detail:", error);
        return { success: false, error: error.message };
    }
};

export default sendEmail;


