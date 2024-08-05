import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Event from "@/models/eventModel";
import Camera from "@/models/cameraModel";

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
        const cameras = await Camera.find({ from_location: slug }).select(
            "_id"
        );
        const cameraIds = cameras.map((camera) => camera._id);

        // Then, find the events that match the camera IDs
        const eventData = await Event.find({ from_camera: { $in: cameraIds } })
            .populate("from_camera", "name")
            .skip(skip)
            .limit(limit);

        // Get the total count of events that match the camera IDs
        const total = await Event.countDocuments({
            from_camera: { $in: cameraIds },
        });

        return NextResponse.json({ eventData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
