"use client";

import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import { TaskProps } from "@/types/task";

export default function TaskManagementList() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);
            try {
                const res = await fetch(`/api/tasks?limit=10&page=${page}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setTasks(data.taskData);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData(page);
    }, [page]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id}>
                    <TaskCard data={task} />
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
