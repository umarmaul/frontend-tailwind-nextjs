"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/types/event";

export default function VisualAnalysisList() {
    const [data, setData] = useState<EventProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/visual-analysis?limit=10&page=${page}`
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
        fetchData(page);
    }, [page]);

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
