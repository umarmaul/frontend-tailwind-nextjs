import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig";
import Task from "@/models/taskModel";

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
