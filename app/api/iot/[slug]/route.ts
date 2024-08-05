// app/api/dashboard/visual-analysis/[slug]/route.js
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";

connect();

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const sensorData = await Sensor.find({ from_location: slug })
            .skip(skip)
            .limit(limit)
            .populate("from_location", "name");
        const total = await Sensor.countDocuments({ from_location: slug });
        return NextResponse.json({ sensorData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
