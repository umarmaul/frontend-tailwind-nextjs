"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import LeadingIndicatorList from "@/components/LeadingIndicatorList";
import { useEffect, useState } from "react";

export default function VisualAnalysisPage({ params: { slug } }: any) {
    const [sensorData, setSensorData] = useState([] as any[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/iot/${slug}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setSensorData(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!sensorData) return <p>No event found</p>;
    console.log(sensorData);

    return (
        <div>
            <Breadcrumb pageName="Leading Indicator / Details" />

            {sensorData.map((data, index) => (
                <LeadingIndicatorList key={index} {...data} />
            ))}
            {/* Render other event details here */}
        </div>
    );
}
