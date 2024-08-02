import { connect } from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Location from "@/models/locationModel";
import Event from "@/models/eventModel";
import Camera from "@/models/cameraModel";

connect();

export async function GET() {
    try {
        // First, find all locations
        const locations = await Location.find({})
            .populate("supervisor", "name")
            .populate("operator", "name");

        // Initialize an array to hold the results
        const result = [];

        // Iterate through each location
        for (const location of locations) {
            // Find cameras for the current location

            const cameras = await Camera.find(
                {
                    from_location: location._doc._id.toString(),
                },
                "_id"
            );

            // Initialize an array to hold events for this location
            const locationEvents = [];

            // Iterate through each camera
            for (const camera of cameras) {
                // Find events for the current camera
                const events = await Event.find(
                    { from_camera: camera._doc._id.toString() },
                    "event_picture"
                );

                // Add events to the locationEvents array
                locationEvents.push(...events);
            }

            // Add the location and its events to the result
            result.push({
                location: location,
                events: locationEvents[0],
            });
        }

        // Return the result as JSON
        return NextResponse.json({ data: result });
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
