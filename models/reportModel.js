import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    report_type: {
        type: String,
        default: "report",
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    reported_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
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
