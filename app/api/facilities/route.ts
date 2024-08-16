import { connect } from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Location from "@/models/locationModel";
import Event from "@/models/eventModel";
import Device from "@/models/deviceModel";
import Sensor from "@/models/sensorModel";

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
            const cameras = await Device.find(
                {
                    from_location: location._doc._id.toString(),
                    type: "camera",
                },
                "_id"
            );
            const sensors = await Device.find(
                {
                    from_location: location._doc._id.toString(),
                    type: "iot",
                },
                "_id"
            );

            let locationEvents = {};
            let totalDevices = {
                sensor: 0,
                camera: 0,
            };

            // Iterate through each camera
            for (const camera of cameras) {
                // Find events for the current camera
                const events = await Event.findOne(
                    { from_device: camera._doc._id.toString() },
                    "event_picture"
                );

                const totalEvents = await Event.countDocuments({
                    from_device: camera._doc._id.toString(),
                    status: "unassigned",
                });

                totalDevices.camera += totalEvents;

                // Add events to the locationEvents object (this assumes only one event per camera is needed)
                locationEvents = events;
            }

            // Iterate through each sensor
            for (const sensor of sensors) {
                const totalSensors = await Sensor.countDocuments({
                    from_device: sensor._doc._id.toString(),
                    status: "unassigned",
                });

                totalDevices.sensor += totalSensors;
            }

            // Add the location and its events to the result
            result.push({
                location: location,
                events: locationEvents,
                totalDevices,
            });
        }

        return NextResponse.json({ data: result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, description, supervisor, operator } = reqBody;

        // Set default values for supervisor and operator if they are not provided
        const defaultSupervisor = supervisor || "66b398bc2f0cb789dd6bd0a8";
        const defaultOperator = operator || "66b398bc2f0cb789dd6bd0a8";

        const newLocation = new Location({
            name,
            description,
            supervisor: defaultSupervisor,
            operator: defaultOperator,
        });

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
