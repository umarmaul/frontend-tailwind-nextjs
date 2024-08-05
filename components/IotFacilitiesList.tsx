"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import IotCard from "./IotCard";
import { IotProps } from "@/types/iot";

export default function IotFacilitiesList() {
    const [sensorData, setSensorData] = useState<IotProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
                setSensorData(data.sensorData);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                setError((error as Error).message);
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
            {sensorData.map((data, index) => (
                <div key={index}>
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
