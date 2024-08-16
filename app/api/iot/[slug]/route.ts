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

    try {
        const statuses = ["unassigned", "resolved"];
        const result = [];
        const total = [];

        for (const status of statuses) {
            const skip = (page - 1) * limit;

            const sensorData = await Sensor.find({ status, from_device: slug })
                .sort({ createdAt: "descending" })
                .skip(skip)
                .limit(limit)
                .populate({
                    path: "from_device",
                    select: "name",
                    populate: {
                        path: "from_location",
                        select: "name",
                    },
                });

            const totalData = await Sensor.countDocuments({
                status,
                from_device: slug,
            });

            result.push(...sensorData);
            total.push(totalData);
        }

        return NextResponse.json({
            sensorData: result,
            total: Math.max(...total),
            page,
            limit,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
