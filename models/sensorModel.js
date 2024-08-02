import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "sensor",
    },
    temperature: {
        type: Number,
        default: 0,
    },
    humidity: {
        type: Number,
        default: 0,
    },
    human_presence: {
        type: Boolean,
        default: false,
    },
    AQI: {
        type: Number,
        default: 0,
    },
    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        default: null,
    },
    status: {
        type: String,
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

const Sensor =
    mongoose.models.sensors || mongoose.model("sensors", sensorSchema);
export default Sensor;
