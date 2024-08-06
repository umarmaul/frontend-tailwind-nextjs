import { useState } from "react";
import { IotProps } from "@/types/iot";
import Modal from "@/components/Modal";

export default function IotCard({ data }: { data: IotProps }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(data.status);

    const toggleStatus = async () => {
        const newStatus = status === "approved" ? "new" : "approved";
        try {
            const response = await fetch("/api/sensor-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data._id, status }),
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
                    status === "approved" ? "bg-green-100" : "bg-red-100"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex flex-col">
                    <p>Name: {data.name}</p>
                    <p>From Location: {data.from_location.name}</p>
                </div>
                <div className="flex flex-col">
                    <p>Temperature: {data.temperature}</p>
                    <p>Humidity: {data.humidity}</p>
                </div>
                <div className="flex flex-col">
                    <p>AQi: {data.AQI}</p>
                    <p>Status: {status}</p>
                </div>
                <div className="md:flex flex-col hidden">
                    <p>ID: {data._id}</p>
                    <p>Created At: {data.createdAt.toString()}</p>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    <p>Name: {data.name}</p>
                    <p>From Location: {data.from_location.name}</p>
                    <p>Temperature: {data.temperature}</p>
                    <p>Humidity: {data.humidity}</p>
                    <p>AQi: {data.AQI}</p>
                    <p>Status: {status}</p>
                    <p>ID: {data._id}</p>
                    <p>Created At: {data.createdAt.toString()}</p>
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
