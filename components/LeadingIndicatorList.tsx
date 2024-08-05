"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import IotCard from "@/components/IotCard";
import { IotProps } from "@/types/iot";

export default function LeadingIndicatorList() {
    const [sensorData, setSensorData] = useState<IotProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);

            try {
                const res = await fetch(
                    `/api/leading-indicator?limit=10&page=${page}`
                );
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
            {sensorData.map((data) => (
                <div key={data._id}>
                    <IotCard data={data} />
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
