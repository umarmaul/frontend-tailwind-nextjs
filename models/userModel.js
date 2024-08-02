import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "user",
    },
    username: {
        type: String,
        default: "user",
    },
    email: {
        type: String,
        default: "user@example.com",
    },
    password: {
        type: String,
        default: "user",
    },
    role: {
        type: String,
        default: "user",
    },
    profie_picture: {
        type: String,
        default: "user.png",
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

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
