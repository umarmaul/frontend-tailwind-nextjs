import mongoose from "mongoose";
import Device from "@/models/deviceModel";

const eventSchema = new mongoose.Schema({
    event_level: {
        type: String,
        default: "low",
    },
    event_type: {
        type: String,
        default: "event",
    },
    event_picture: {
        type: String,
        default: "no picture",
    },
    description: {
        type: String,
        default: "no description",
    },
    from_device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Device,
        default: "66ad0f848344ce01638f7b30",
    },
    status: {
        type: String,
        default: "unassigned",
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

const Event = mongoose.models.events || mongoose.model("events", eventSchema);
export default Event;
