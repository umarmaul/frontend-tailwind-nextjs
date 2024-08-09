import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Event from "@/models/eventModel";

connect();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const eventData = await Event.find()
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
        const total = await Event.countDocuments();
        return NextResponse.json({ eventData, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
