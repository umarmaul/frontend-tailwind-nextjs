import { connect } from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Device from "@/models/deviceModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            name,
            from_location,
            identifier,
            ip_address,
            specification,
            type,
        } = reqBody;

        // Set default values for supervisor and operator if they are not provided
        const defaultName = name || "Device";
        const defaultLocation = from_location || "66ad09b370f0f00db3f3fc6b";
        const defaultIdentifier = identifier || "device identifier";
        const defaultIpAddress = ip_address || "127.0.0.1";
        const defaultSpecification = specification || "specification";
        const defaultType = type || "iot";

        const newDevice = new Device({
            name: defaultName,
            from_location: defaultLocation,
            identifier: defaultIdentifier,
            ip_address: defaultIpAddress,
            specification: defaultSpecification,
            type: defaultType,
        });

        const savedDevice = await newDevice.save();

        return NextResponse.json({
            message: "Location created successfully",
            success: true,
            data: savedDevice,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
