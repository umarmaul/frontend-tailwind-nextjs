import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Device from "@/models/deviceModel";
import Event from "@/models/eventModel";

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
        const devices = await Device.find({
            from_location: slug,
            type: "camera",
        })
            .skip(skip)
            .limit(limit)
            .populate("from_location", "name");

        // Add event data count for each device
        const deviceData = await Promise.all(
            devices.map(async (device) => {
                const totalAlerts = await Event.countDocuments({
                    from_device: device._id,
                    status: "new",
                });
                return {
                    ...device.toObject(),
                    totalAlerts,
                };
            })
        );

        const total = await Device.countDocuments({
            from_location: slug,
            type: "camera",
        });

        return NextResponse.json({ deviceData, total, page, limit });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
