import rateLimit from 'express-rate-limit';
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: {
        success: false,
        message: 'Too many attempts. Please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const mailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Only 3 emails per hour
    message: {
        success: false,
        message: 'Too many password reset requests. Please check your email or try again in an hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const otpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: {
        success: false,
        message: 'Too many OTP requests. Please try again in an hour.',
    },
});
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many contact enquiries from this IP, please try again after an hour',
});
const enquiryRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 3, // Limit each IP to 3 enquiries per hour
    message: {
        success: false,
        message: "Too many enquiries from this IP. Please try again after an hour to prevent spam."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
});
export const RateLimiter = {
    authLimiter,
    mailLimiter,
    otpLimiter,
    contactLimiter,
    globalLimiter,
    enquiryRateLimiter
};
//# sourceMappingURL=rateLimiter.js.map