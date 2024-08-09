"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/types/event";

export default function CameraFacilitiesList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const statuses = ["new", "approved"];
    const [cameraPages, setCameraPages] = useState<{
        [key: string]: EventProps[];
    }>({});

    const { slug } = useParams();
    const formattedSlug = Array.isArray(slug) ? slug[0] : slug;

    useEffect(() => {
        const fetchData = async (page: number, slug: string) => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/camera/${slug}?limit=10&page=${page}`
                );
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                const groupedCameras: { [key: string]: EventProps[] } = {
                    new: data.eventData.filter(
                        (camera: EventProps) => camera.status === "new"
                    ),
                    approved: data.eventData.filter(
                        (camera: EventProps) => camera.status === "approved"
                    ),
                };
                setCameraPages(groupedCameras);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchData(page, formattedSlug);
    }, [page, formattedSlug]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex space-x-4 overflow-auto focus:outline-none">
                {statuses.map((status) => (
                    <div key={status} className="flex-1">
                        <h2 className="text-lg font-bold mb-2">{status}</h2>
                        {cameraPages[status]?.map((task) => (
                            <div key={task._id}>
                                <EventCard data={task} />
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
