"use client";

import Pagination from "@/components/Pagination";
import TaskCard from "@/components/TaskCard";
import { useState, useEffect } from "react";
import { TaskProps } from "@/types/task";

export default function TaskManagementList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const statuses = ["to do", "in progress", "in approval"];
    const [taskPages, setTaskPages] = useState<{ [key: string]: TaskProps[] }>(
        {}
    );

    useEffect(() => {
        const fetchData = async (page: number) => {
            setLoading(true);
            try {
                const res = await fetch(`/api/tasks?limit=10&page=${page}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                const groupedTasks: { [key: string]: TaskProps[] } = {
                    "to do": data.taskData.filter(
                        (task: TaskProps) => task.status === "to do"
                    ),
                    "in progress": data.taskData.filter(
                        (task: TaskProps) => task.status === "in progress"
                    ),
                    "in approval": data.taskData.filter(
                        (task: TaskProps) => task.status === "in approval"
                    ),
                };
                setTaskPages(groupedTasks);
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
            <div className="flex space-x-4 overflow-auto focus:outline-none">
                {statuses.map((status) => (
                    <div key={status} className="flex-1">
                        <h2 className="text-lg font-bold mb-2">{status}</h2>
                        {taskPages[status]?.map((task) => (
                            <div key={task._id}>
                                <TaskCard data={task} />
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
