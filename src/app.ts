import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';


const app = express();

app.use(express.json());

// Your Routes
// app.use('/api/v1', router);

// Global Error Handler (Must be at the bottom)
app.use(globalErrorHandler);