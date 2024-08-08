import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";

connect();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    try {
        const statuses = ["new", "approved"];
        const result = [];
        const total = [];

        for (const status of statuses) {
            const skip = (page - 1) * limit;

            const sensorData = await Sensor.find({ status })
                .sort({ createdAt: "descending" })
                .skip(skip)
                .limit(limit)
                .populate("from_location", "name");
            const totalData = await Sensor.countDocuments({ status });

            result.push(...sensorData);
            total.push(totalData);
        }
        return NextResponse.json({
            sensorData: result,
            page,
            total: Math.max(...total),
            limit,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
