"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/types/event";

export default function CameraFacilitiesList() {
    const [data, setData] = useState<EventProps[]>([]);
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
                    `/api/camera/${slug}?limit=10&page=${page}`
                );
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setData(data.eventData);
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
            {data.map((event) => (
                <div key={event._id}>
                    <EventCard data={event} />
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
