import mongoose from "mongoose";
import User from "@/models/userModel";
import Event from "@/models/eventModel";
import Sensor from "@/models/sensorModel";

const reportSchema = new mongoose.Schema({
    report_type: {
        type: String,
        default: "report",
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: "66b398bc2f0cb789dd6bd0a8",
    },
    reported_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: "66b398bc2f0cb789dd6bd0a8",
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event,
        default: null,
    },
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Sensor,
        default: null,
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
