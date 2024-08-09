import mongoose from "mongoose";
import Location from "@/models/locationModel";

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "device",
    },
    ip_address: {
        type: String || Number,
        default: "127.0.0.1",
    },
    identifier: {
        type: String,
        default: "device identifier",
    },
    specification: {
        type: String,
        default: "device specification",
    },
    type: {
        type: String,
        default: "device type",
    },
    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Location,
        default: "66ad09b370f0f00db3f3fc6b",
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

const Device =
    mongoose.models.devices || mongoose.model("devices", deviceSchema);
export default Device;
