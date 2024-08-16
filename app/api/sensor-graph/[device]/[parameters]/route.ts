import { connect } from "@/utils/dbConfig";
import Sensor from "@/models/sensorModel";
import { NextResponse } from "next/server";
import Device from "@/models/deviceModel";

connect();

export async function GET(
    request: Request,
    { params }: { params: { device: string; parameters: string } }
) {
    const { device, parameters } = params;

    try {
        const data = await Sensor.find({
            from_device: device,
        })
            .sort({ createdAt: "descending" })
            .limit(10)
            .select([parameters, "createdAt"])
            .exec();

        const responseData = data.map((record) => ({
            value: record[parameters],
            time: record.createdAt,
        }));
        const deviceName = await Device.findOne({
            _id: device,
        })
            .select("name")
            .exec();

        return NextResponse.json({
            device: deviceName.name,
            parameters,
            data: responseData,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
