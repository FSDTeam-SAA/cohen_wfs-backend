import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

let server: Server;

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('🍃 Database connected successfully');

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

/**
 * REUSABLE SHUTDOWN FUNCTION
 * This handles closing the server and DB connection cleanly.
 */
const shutdownGracefully = async (signal: string) => {
    console.log(`\n🛑 ${signal} received. Starting graceful shutdown...`);

    // Force shutdown after 10 seconds if graceful exit hangs
    setTimeout(() => {
        console.error('强制退出: Could not close connections in time, forcefully shutting down.');
        process.exit(1);
    }, 10000);

    if (server) {
        server.close(async () => {
            console.log('📡 HTTP server closed.');
            try {
                await mongoose.connection.close(false);
                console.log('🍃 MongoDB connection closed.');
                process.exit(0);
            } catch (err) {
                console.error('❌ Error during DB closure:', err);
                process.exit(1);
            }
        });
    } else {
        process.exit(0);
    }
};

// --- ERROR LISTENERS ---

// 1. Handle Unhandled Promise Rejections (Async errors)
process.on('unhandledRejection', (error) => {
    console.error('🚫 UNHANDLED REJECTION detected:', error);
    // We don't exit immediately; we try to close the server first
    shutdownGracefully('UNHANDLED_REJECTION');
});

// 2. Handle Uncaught Exceptions (Sync errors)
process.on('uncaughtException', (error) => {
    console.error('🚫 UNCAUGHT EXCEPTION detected:', error);
    // Important: Sync errors are dangerous, usually better to exit fast but try clean up
    shutdownGracefully('UNCAUGHT_EXCEPTION');
});

// --- SIGNAL LISTENERS ---

// Handle Ctrl+C (Local development)
process.on('SIGINT', () => shutdownGracefully('SIGINT'));

// Handle Termination (Docker/PM2/Cloud)
process.on('SIGTERM', () => shutdownGracefully('SIGTERM'));