import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app.js'; // Importing your actual app logic
import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';

dotenv.config();

let server: Server;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is running with TypeScript NodeNext!');
});

async function main() {
    try {
        // 1. Connect to Database (using your .env variable name)
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('🍃 Database connected successfully');

        // 2. Start Server
        const port = process.env.PORT || 5000;
        server = app.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

main();