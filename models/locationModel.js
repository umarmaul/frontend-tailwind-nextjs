import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "location",
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    description: {
        type: String,
        default: "no description",
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

const Location =
    mongoose.models.locations || mongoose.model("locations", locationSchema);
export default Location;
