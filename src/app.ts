import { pinoHttp } from 'pino-http';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './middlewares/notFound.js';
import router from './routes/index.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { RateLimiter } from './middlewares/rateLimiter.js';
import logger from './utils/logger.js';
import config from './config/index.js';

const app: Application = express();


// Parsers
app.use(express.json());
app.use(cors(
    { origin: config.frontend_url, credentials: true }
));
app.use(cookieParser());



app.use(pinoHttp({
    logger,
    customLogLevel: (res, err) => {
        if (err || (res.statusCode !== undefined && res.statusCode >= 400)) return 'error';
        return 'info';
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
        }),
    },
}));

app.get('/', (req, res) => {
    res.send('Server is running with TypeScript NodeNext!');
});

// Application Routes
app.use('/api/v1', router);

app.use(RateLimiter.globalLimiter);

// This acts as the "Catch-all" for any URL that didn't match the routes above
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;