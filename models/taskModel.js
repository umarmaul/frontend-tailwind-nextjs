import mongoose from "mongoose";
import User from "@/models/userModel";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: "66ad0731aba7a239702a3f55",
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    description: {
        type: String,
        default: "no description",
    },
    status: {
        type: String,
        default: "new",
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

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default Task;
