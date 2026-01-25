import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        // Change MONGO_URI to MONGODB_URI to match your .env
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }
        const conn = await mongoose.connect(uri);
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map