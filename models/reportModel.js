import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    report_type: {
        type: String,
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    reported_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
    },
    events: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new", "on_progress", "done"],
        default: "new",
    },
    report_file: {
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

const Report =
    mongoose.models.reports || mongoose.model("reports", reportSchema);
export default Report;
