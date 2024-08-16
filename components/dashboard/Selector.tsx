"use client";

import { useState, useEffect } from "react";
import { LocationProps } from "@/types/location";

export default function Selector() {
    const [location, setLocation] = useState<LocationProps[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedRange, setSelectedRange] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const fetchLocation = async () => {
        try {
            const response = await fetch("/api/all-location");
            const data = await response.json();
            setLocation(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <div className="flex space-x-2 justify-between items-center mb-6">
            <h1 className="lg:text-3xl text-lg font-bold text-primary">
                Control Room / Overview
            </h1>
            <div className="flex lg:space-x-4 space-x-1 text-xs lg:text-lg">
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="border p-2 rounded-lg bg-dark-7"
                >
                    <option value="">Location</option>
                    {location.map((location) => (
                        <option key={location._id} value={location._id}>
                            {location.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                    className="border p-2 rounded-lg bg-dark-7"
                >
                    <option value="">Range</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                {selectedRange === "daily" && (
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded-lg bg-dark-7"
                    />
                )}
                {selectedRange === "weekly" && (
                    <input
                        type="week"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded-lg bg-dark-7"
                    />
                )}
                {selectedRange === "monthly" && (
                    <input
                        type="month"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded-lg bg-dark-7"
                    />
                )}
            </div>
        </div>
    );
}
