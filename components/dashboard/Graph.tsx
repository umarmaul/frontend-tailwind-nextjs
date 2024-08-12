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

export default function SensorGraph() {
    const data = {
        labels: [
            "18:00",
            "20:00",
            "22:00",
            "00:00",
            "02:00",
            "04:00",
            "06:00",
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
        ],
        datasets: [
            {
                label: "Temperature (°C)",
                data: [32, 30, 28, 29, 31, 35, 38, 40, 42, 39, 36, 34, 32],
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
                text: "Sensor Data from IoT",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 60,
                ticks: {
                    stepSize: 5,
                },
                title: {
                    display: true,
                    text: "Temperature (°C)",
                },
            },
        },
    };

    return (
        <div className="flex justify-center flex-1">
            <Line data={data} options={options} />
        </div>
    );
}
