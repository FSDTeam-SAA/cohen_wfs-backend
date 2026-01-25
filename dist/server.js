import mongoose from 'mongoose';
import app from './app.js'; // Importing your actual app logic
import dotenv from 'dotenv';
dotenv.config();
let server;
app.get('/', (req, res, next) => {
    res.send('Server is running with TypeScript NodeNext!');
});
async function main() {
    try {
        // 1. Connect to Database (using your .env variable name)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🍃 Database connected successfully');
        // 2. Start Server
        const port = process.env.PORT || 5000;
        server = app.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map