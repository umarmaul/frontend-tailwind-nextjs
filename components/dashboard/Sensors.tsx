"use client";

import SensorGraph from "./Graph";
import { useState, useEffect } from "react";
import { DeviceProps } from "@/types/device";

export default function Sensors() {
    const [devices, setDevices] = useState<DeviceProps[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string>("");
    const [selectedParameter, setSelectedParameter] = useState<string>("");
    const [graphData, setGraphData] = useState<{ value: number; time: Date }[]>(
        []
    );
    const [parameter, setParameter] = useState<string>("");
    const [device, setDevice] = useState<string>("");

    const fetchDevices = async () => {
        try {
            const response = await fetch("/api/all-device");
            const data = await response.json();
            setDevices(data);
        } catch (error) {
            console.error("Failed to fetch devices:", error);
        }
    };

    const fetchData = async () => {
        if (selectedDevice && selectedParameter) {
            try {
                const response = await fetch(
                    `/api/sensor-graph/${selectedDevice}/${selectedParameter}`
                );
                const data = await response.json();
                setGraphData(data.data);
                setParameter(data.parameters);
                setDevice(data.device);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedDevice, selectedParameter]);

    return (
        <div className="flex flex-col w-full h-full">
            <h3 className="text-3xl font-medium text-primary">Sensors</h3>
            <div className="bg-white rounded-lg p-4 my-2">
                <div className="flex flex-col space-y-4 justify-start">
                    <div className="flex space-x-4">
                        <select
                            value={selectedDevice}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                            className="border p-2 rounded-lg bg-dark-8"
                        >
                            <option value="">Device</option>
                            {devices.map((device) => (
                                <option key={device._id} value={device._id}>
                                    {device.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedParameter}
                            onChange={(e) =>
                                setSelectedParameter(e.target.value)
                            }
                            className="border p-2 rounded-lg bg-dark-8"
                        >
                            <option value="">Parameter</option>
                            <option value="temperature">Temperature</option>
                            <option value="humidity">Humidity</option>
                            <option value="human_presence">
                                Human Presence
                            </option>
                            <option value="AQI">AQI</option>
                        </select>
                    </div>
                    <SensorGraph
                        data={graphData ?? []}
                        parameters={parameter ?? ""}
                        device={device ?? ""}
                    />
                    <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4 pl-10 text-sm">
                        <p>
                            <span className="bg-lime-400">
                                `No major {parameter} hazard`
                            </span>
                        </p>
                        <p>
                            <span className="bg-yellow-300">
                                Higher activity in 10-14 in the last 2 weeks
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
