"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface SensorGraphProps {
    device: string;
    parameters: string;
    data: { value: number; time: Date }[];
}

export default function SensorGraph({
    device,
    parameters,
    data,
}: SensorGraphProps) {
    const labels = data.map((record) =>
        new Date(record.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );

    const graphData = {
        labels,
        datasets: [
            {
                label: parameters,
                data: data.map((record) => record.value),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            title: {
                display: true,
                text: `Data from ${device}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    stepSize: 5,
                },
                title: {
                    display: true,
                    text: "Value",
                },
            },
        },
    };

    return (
        <div className="flex justify-center flex-1">
            <Line data={graphData} options={options} />
        </div>
    );
}
