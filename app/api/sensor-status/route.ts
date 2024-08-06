import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";

connect();

export async function POST(req: NextRequest) {
    const { id, status } = await req.json();

    try {
        const result = await Sensor.updateOne(
            { _id: id },
            { $set: { status: status === "active" ? "inactive" : "active" } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "Document not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Status updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
