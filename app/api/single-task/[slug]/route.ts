import { connect } from "@/utils/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/eventModel";
import Sensor from "@/models/sensorModel";

connect();

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    try {
        const task = await Task.findOne({ _id: slug }).populate({
            path: "user",
            select: "name email role profile_picture",
        });

        let task_data;
        task_data = await Event.findById(task.task).populate({
            path: "from_device",
            select: "name",
            populate: {
                path: "from_location",
                select: "name",
            },
        });

        if (task_data === null) {
            task_data = await Sensor.findById(task.task).populate({
                path: "from_device",
                populate: {
                    path: "from_location",
                    select: "name",
                },
            });
        }

        task._doc.task = task_data;

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
