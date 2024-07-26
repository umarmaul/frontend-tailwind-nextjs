import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    temperature: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    human_presence: {
        type: Boolean,
    },
    AQI: {
        type: Number,
    },
    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.sensors ||
    mongoose.model("sensors", sensorSchema);
