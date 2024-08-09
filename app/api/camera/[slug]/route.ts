import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Event from "@/models/eventModel";
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
        const cameras = await Device.find({
            from_location: slug,
            type: "camera",
        }).select("_id");
        const cameraIds = cameras.map((camera) => camera._id);

        // Then, find the events that match the camera IDs
        const eventData = await Event.find({ from_device: { $in: cameraIds } })
            .skip(skip)
            .limit(limit)
            .populate("from_device", "name");

        // Get the total count of events that match the camera IDs
        const total = await Event.countDocuments({
            from_device: { $in: cameraIds },
        });

        return NextResponse.json({ eventData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
