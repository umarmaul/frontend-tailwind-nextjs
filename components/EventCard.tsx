import { EventProps } from "@/types/event";
import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function EventCard({ data }: { data: EventProps }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(data.status);

    const toggleStatus = async () => {
        const newStatus = status === "approved" ? "new" : "approved";
        try {
            const response = await fetch("/api/event-status", {
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
                className={`flex justify-around items-center text-center my-6 border rounded-lg p-4 space-x-4 text-sm md:text-lg cursor-pointer transition-colors duration-300 ${
                    status === "approved" ? "bg-green-100" : "bg-red-100"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="container flex flex-1 justify-around items-center rounded-lg md:space-x-6 text-sm md:text-lg">
                    <Image
                        src={data.event_picture}
                        alt="user"
                        width={250}
                        height={250}
                        className="object-cover rounded-xl md:w-[266px] md:h-[150px] w-[133px] h-[75px]"
                    />
                    <div className="flex flex-1 items-start py-2 px-6 md:px-0 md:pr-6 space-x-12 md:space-x-4">
                        <div className="flex flex-col w-1/4">
                            <p>Level: {data.event_level}</p>
                            <p>Type: {data.event_type}</p>
                        </div>
                        <div className="hidden md:flex flex-col w-1/4">
                            <p>Description: {data.description}</p>
                        </div>
                        <div className="flex flex-col w-1/4">
                            <p>Device: {data.from_device?.name}</p>
                            <p>
                                Location:{" "}
                                {data.from_device?.from_location?.name}
                            </p>
                            <p>Status: {status}</p>
                        </div>
                        <div className="md:flex flex-col hidden w-1/4">
                            <p>ID: {data._id}</p>
                            <p>
                                Created At:{" "}
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    <Image
                        src={data.event_picture}
                        alt="user"
                        width={250}
                        height={250}
                    />
                    <p>Level: {data.event_level}</p>
                    <p>Type: {data.event_type}</p>
                    <p>Description: {data.description}</p>
                    <p>Device: {data.from_device?.name}</p>
                    <p>Location: {data.from_device?.from_location?.name}</p>
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
