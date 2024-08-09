import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";
import Event from "@/models/eventModel";

connect();

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        await Task.updateOne(
            { _id: data.id },
            { $set: { status: data.status } }
        );
        if (data.type === "iot") {
            await Sensor.updateOne(
                { _id: data.task },
                { $set: { status: data.status } }
            );
        } else {
            await Event.updateOne(
                { _id: data.task },
                { $set: { status: data.status } }
            );
        }

        return NextResponse.json(
            { message: "Task accepted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
