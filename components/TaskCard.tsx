import { useState } from "react";
import { TaskProps } from "@/types/task";
import Modal from "@/components/Modal";

export default function TaskCard({ data }: { data: TaskProps }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(data.status);
    const isEventTask = data.task.event_level !== undefined;

    const toggleStatus = async () => {
        const newStatus = status === "approved" ? "new" : "approved";
        const apiUrl = isEventTask ? "/api/event-status" : "/api/sensor-status";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data._id, status: newStatus }),
            });
            if (response.ok) {
                setStatus(newStatus);
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            <div
                className={`flex justify-around border items-center text-center my-6 rounded-lg p-4 space-x-4 text-sm md:text-lg cursor-pointer transition-colors duration-300 ${
                    status === "in approval"
                        ? "bg-green-50"
                        : status === "in progress"
                        ? "bg-yellow-50"
                        : "bg-red-50"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex flex-col">
                    <p>Name: {data.user.name}</p>
                    <p>Email: {data.user.email}</p>
                </div>
                {isEventTask ? (
                    <div className="flex flex-col">
                        <p>Event Level: {data.task.event_level}</p>
                        <p>Event Type: {data.task.event_type}</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <p>Temperature: {data.task.temperature}</p>
                        <p>Humidity: {data.task.humidity}</p>
                    </div>
                )}
                {isEventTask ? (
                    <div className="flex flex-col">
                        <p>Description: {data.task.description}</p>
                        <p>Status: {status}</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <p>AQi: {data.task.AQI}</p>
                        <p>Status: {status}</p>
                    </div>
                )}
                <div className="md:flex flex-col hidden">
                    <p>ID: {data._id}</p>
                    <p>
                        Created At: {new Date(data.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    <p>Name: {data.user.name}</p>
                    <p>Email: {data.user.email}</p>
                    {isEventTask ? (
                        <>
                            <p>Event Level: {data.task.event_level}</p>
                            <p>Event Type: {data.task.event_type}</p>
                            <p>Description: {data.task.description}</p>
                        </>
                    ) : (
                        <>
                            <p>Temperature: {data.task.temperature}</p>
                            <p>Humidity: {data.task.humidity}</p>
                            <p>AQi: {data.task.AQI}</p>
                        </>
                    )}
                    <p>Status: {status}</p>
                    <p>ID: {data._id}</p>
                    <p>
                        Created At: {new Date(data.createdAt).toLocaleString()}
                    </p>
                    <button
                        onClick={toggleStatus}
                        className="mt-4 bg-blue-500 text-white rounded p-2"
                    >
                        Toggle Status
                    </button>
                </div>
            </Modal>
        </>
    );
}
