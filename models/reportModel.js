import mongoose from "mongoose";
import User from "@/models/userModel";

const reportSchema = new mongoose.Schema({
    report_type: {
        type: String,
        default: "report type",
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
    task: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    report_details: {
        type: String,
        default: "no description",
    },
    status: {
        type: String,
        default: "in approval",
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
