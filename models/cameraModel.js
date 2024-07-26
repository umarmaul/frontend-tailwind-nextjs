import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    ip_address: {
        type: String || Number,
    },
    identifier: {
        type: String,
    },
    type: {
        type: String,
    },
    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
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

export default mongoose.models.cameras ||
    mongoose.model("cameras", cameraSchema);
