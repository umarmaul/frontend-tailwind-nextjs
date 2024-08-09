import mongoose from "mongoose";
import User from "@/models/userModel";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "location",
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: "66b398bc2f0cb789dd6bd0a8",
    },
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: "66b398bc2f0cb789dd6bd0a8",
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
