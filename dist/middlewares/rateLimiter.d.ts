export declare const RateLimiter: {
    authLimiter: import("express-rate-limit").RateLimitRequestHandler;
    mailLimiter: import("express-rate-limit").RateLimitRequestHandler;
    otpLimiter: import("express-rate-limit").RateLimitRequestHandler;
    contactLimiter: import("express-rate-limit").RateLimitRequestHandler;
    globalLimiter: import("express-rate-limit").RateLimitRequestHandler;
    enquiryRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
};
