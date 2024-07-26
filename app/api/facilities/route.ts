import { connect } from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Location from "@/models/locationModel";
import User from "@/models/userModel";

connect();

export async function GET() {
    try {
        const locations = await Location.find()
            .populate("supervisor")
            .populate("operator");
        return NextResponse.json(locations);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const newLocation = new Location(reqBody);
        const savedLocation = await newLocation.save();

        return NextResponse.json({
            message: "Location created successfully",
            success: true,
            data: savedLocation,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
