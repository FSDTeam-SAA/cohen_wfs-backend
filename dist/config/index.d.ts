declare const _default: {
    port: string | undefined;
    mongodbUrl: string | undefined;
    nodeEnv: string | undefined;
    bcryptSaltRounds: string | undefined;
    NODE_ENV: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_EXPIRES_IN: string | undefined;
    refreshTokenSecret: string | undefined;
    jwtRefreshTokenExpiresIn: string | undefined;
    email: {
        emailAddress: string | undefined;
        emailPass: string | undefined;
        adminEmail: string | undefined;
        adminEmailAddress: string | undefined;
    };
    reset: {
        reset_password_token_secret: string | undefined;
        reset_password_token_expires: string | undefined;
    };
    cloudinary: {
        cloud_name: string | undefined;
        api_key: string | undefined;
        api_secret: string | undefined;
    };
    security: {
        AES_KEY: string | undefined;
        AES_IV: string | undefined;
    };
    frontend_reset_password_url: string | undefined;
    frontend_url: string | undefined;
    stripe: {
        stripeSecretKey: string | undefined;
        stripeAdminWebhookSecret: string | undefined;
        stripeAdminWebhookUrl: string | undefined;
        stripeOnboardWebhookSecret: string | undefined;
        stripeOnboardWebhookUrl: string | undefined;
    };
};
export default _default;
