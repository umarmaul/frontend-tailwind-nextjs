import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "camera",
    },
    ip_address: {
        type: String || Number,
        default: "127.0.0.1",
    },
    identifier: {
        type: String,
        default: "camera",
    },
    type: {
        type: String,
        default: "cctv",
    },
    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        default: null,
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

const Camera =
    mongoose.models.cameras || mongoose.model("cameras", cameraSchema);
export default Camera;
