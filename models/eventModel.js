import mongoose from "mongoose";

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
        default: "event.png",
    },
    description: {
        type: String,
        default: "no description",
    },
    from_camera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cameras",
        default: null,
    },
    status: {
        type: String,
        default: "new",
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
