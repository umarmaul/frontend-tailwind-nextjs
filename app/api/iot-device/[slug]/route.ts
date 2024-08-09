import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
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
        const deviceData = await Device.find({
            from_location: slug,
            type: "iot",
        })
            .skip(skip)
            .limit(limit)
            .populate("from_location", "name");

        const total = await Device.countDocuments({
            from_location: slug,
            type: "iot",
        });

        return NextResponse.json({ deviceData, total, page, limit });
    } catch (error) {}
}
