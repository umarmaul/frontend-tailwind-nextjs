import { connect } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import Sensor from "@/models/sensorModel";

connect();

export async function GET() {
    try {
        const data = await Sensor.find()
            .sort({ createdAt: "descending" })
            .populate("from_device", "name")
            .limit(12);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch sensor data:", error);
        return NextResponse.json({ error: "Failed to fetch sensor data" });
    }
}
