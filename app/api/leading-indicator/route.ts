import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";

connect();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const sensorData = await Sensor.find()
            .skip(skip)
            .limit(limit)
            .populate("from_location", "name");
        const total = await Sensor.countDocuments();
        return NextResponse.json({ sensorData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
