import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB Connected");
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "e-commerce",
            family: 4
        });

    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
