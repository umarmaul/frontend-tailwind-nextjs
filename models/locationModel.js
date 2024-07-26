import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    description: {
        type: String,
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
