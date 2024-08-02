import mongoose from "mongoose";
const EventEmitter = require("events");

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        // Increase limit for a specific emitter
        mongoose.connection.setMaxListeners(20);

        // Increase limit for all instances of EventEmitter
        EventEmitter.defaultMaxListeners = 20;

        mongoose.set("strictPopulate", false);

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error: ", err);
            process.exit(1);
        });
    } catch (error) {
        console.log(error);
    }
}
