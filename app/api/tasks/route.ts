import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Task from "@/models/taskModel";
import Sensor from "@/models/sensorModel";
import Event from "@/models/eventModel";

connect();

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        await Task.create(data);
        await Sensor.updateOne(
            { _id: data.task },
            { $set: { status: "to do" } }
        );
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

    try {
        const statuses = ["to do", "in progress", "in approval"];
        const result = [];
        const total = [];

        for (const status of statuses) {
            const skip = (page - 1) * limit;
            const taskDatas = await Task.find({ status })
                .sort({ createdAt: "descending" })
                .skip(skip)
                .limit(limit)
                .populate("user", ["name", "email", "role", "profile_picture"]);
            const totalData = await Task.countDocuments({ status });
            total.push(totalData);

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
        }

        return NextResponse.json({
            taskData: result,
            total: Math.max(...total),
            page,
            limit,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch task data" },
            { status: 500 }
        );
    }
}
