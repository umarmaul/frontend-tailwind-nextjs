"use client";

import { DeviceProps } from "@/types/device";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DeviceCard from "@/components/DeviceCard";

export default function CameraDeviceList() {
    const [deviceData, setDeviceData] = useState<DeviceProps[]>([]);
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
                    `/api/camera-device/${slug}?limit=10&page=${page}`
                );
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setDeviceData(data.deviceData);
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
            {deviceData.map((data) => (
                <div key={data._id}>
                    <DeviceCard data={data} />
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
