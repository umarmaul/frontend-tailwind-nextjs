import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Task from "@/models/taskModel";
import Sensor from "@/models/sensorModel";
import Event from "@/models/eventModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const task = await req.json();
        await Task.create(task);
        return NextResponse.json(
            { message: "Task created successfully" },
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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    try {
        const taskDatas = await Task.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["name", "email", "role", "profile_picture"]);

        const result = [];

        for (const populate of taskDatas) {
            let task_data;
            task_data = await Event.findById(populate.task).populate(
                "from_camera",
                "name"
            );

            if (task_data === null) {
                task_data = await Sensor.findById(populate.task).populate(
                    "from_location",
                    "name"
                );
            }

            populate._doc.task = task_data;
            result.push(populate);
        }

        const total = await Task.countDocuments();
        return NextResponse.json({ taskData: result, total, page, limit });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch task data" },
            { status: 500 }
        );
    }
}
