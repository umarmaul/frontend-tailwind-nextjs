import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET() {
    try {
        const userData = await User.find().sort({ name: "ascending" });
        return NextResponse.json(userData);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
