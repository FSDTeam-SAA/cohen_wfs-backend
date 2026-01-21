import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './middlewares/notFound.js';
import router from './routes/index.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { RateLimiter } from './middlewares/rateLimiter.js';


const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Application Routes
app.use('/api/v1', router);

app.use(RateLimiter.globalLimiter);

// This acts as the "Catch-all" for any URL that didn't match the routes above
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;