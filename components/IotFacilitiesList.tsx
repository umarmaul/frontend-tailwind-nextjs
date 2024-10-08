"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import IotCard from "./IotCard";
import { IotProps } from "@/types/iot";

export default function IotFacilitiesList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const statuses = ["unassigned", "resolved"];
    const [iotPages, setIotPages] = useState<{ [key: string]: IotProps[] }>({});

    const { slug } = useParams();
    const formattedSlug = Array.isArray(slug) ? slug[0] : slug;

    useEffect(() => {
        const fetchData = async (page: number, slug: string) => {
            setLoading(true);

            try {
                const res = await fetch(
                    `/api/iot/${slug}?limit=10&page=${page}`
                );
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                const groupedIots: { [key: string]: IotProps[] } = {
                    unassigned: data.sensorData.filter(
                        (iot: IotProps) => iot.status === "unassigned"
                    ),
                    resolved: data.sensorData.filter(
                        (iot: IotProps) => iot.status === "resolved"
                    ),
                };
                setIotPages(groupedIots);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData(page, formattedSlug);
    }, [page, formattedSlug]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="flex space-x-4 overflow-auto focus:outline-none">
                {statuses.map((status) => (
                    <div key={status} className="flex-1">
                        <h2 className="text-lg font-bold mb-2">{status}</h2>
                        {iotPages[status]?.map((task) => (
                            <div key={task._id}>
                                <IotCard data={task} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </div>
    );
}
