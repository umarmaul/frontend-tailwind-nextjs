import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";
import Device from "@/models/deviceModel";

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
        const iots = await Device.find({
            from_location: slug,
            type: "iot",
        }).select("_id");
        const iotIds = iots.map((iot) => iot._id);

        const sensorData = await Sensor.find({ from_device: { $in: iotIds } })
            .skip(skip)
            .limit(limit)
            .populate("from_device", "name");

        const total = await Sensor.countDocuments({
            from_device: { $in: iotIds },
        });
        return NextResponse.json({ sensorData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
