"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";

interface LeadingIndicatorListProps {
    _id: string;
    name: string;
    temperature: number;
    humidity: number;
    AQI: number;
    from_location: {
        name: string;
    };
    status: string;
    createdAt: Date;
}

export default function LeadingIndicatorList() {
    const [sensorData, setSensorData] = useState<LeadingIndicatorListProps[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);

            try {
                const res = await fetch(`/api/iot?limit=10&page=${page}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setSensorData(data.sensorData);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(page);
    }, [page]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {sensorData.map((data, index) => (
                <div key={index}>
                    <div className="flex justify-around items-center text-center bg-white m-4 rounded-lg p-4 space-x-4">
                        <div className="flex flex-col">
                            <p>Name: {data.name}</p>
                            <p>From Location: {data.from_location.name}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>Temperature: {data.temperature}</p>
                            <p>Humidity: {data.humidity}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>AQi: {data.AQI}</p>
                            <p>Status: {data.status}</p>
                        </div>
                        <div className="flex flex-col">
                            <p>ID: {data._id}</p>
                            <p>Created At: {data.createdAt.toString()}</p>
                        </div>
                    </div>
                </div>
            ))}
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
}
