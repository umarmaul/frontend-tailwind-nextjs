import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Device from "@/models/deviceModel";

connect();

export async function GET() {
    try {
        const deviceData = await Device.find({ name: /sensor/i }).sort({
            name: "ascending",
        });
        return NextResponse.json(deviceData);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
