import mongoose from "mongoose";
import User from "@/models/userModel";
import Event from "@/models/eventModel";

const reportSchema = new mongoose.Schema({
    report_type: {
        type: String,
        default: "report",
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: null,
    },
    reported_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: null,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event,
        default: null,
    },
    events: {
        type: String,
        default: "none",
    },
    status: {
        type: String,
        default: "new",
    },
    report_file: {
        type: String,
        default: "none",
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

const Report =
    mongoose.models.reports || mongoose.model("reports", reportSchema);
export default Report;
