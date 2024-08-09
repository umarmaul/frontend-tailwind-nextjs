import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Location from "@/models/locationModel";

connect();

export async function GET() {
    try {
        const locationData = await Location.find().sort({ name: "ascending" });
        return NextResponse.json(locationData);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sensor data" },
            { status: 500 }
        );
    }
}
