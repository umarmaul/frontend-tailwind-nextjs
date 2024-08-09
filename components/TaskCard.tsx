import { useState } from "react";
import { TaskProps } from "@/types/task";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TaskCard({ data }: { data: TaskProps }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(data.status);
    const isEventTask = data.task.event_level !== undefined;
    const router = useRouter();

    const handleAccept = async () => {
        const newStatus = status === "to do" ? "in progress" : "to do";
        const type = isEventTask ? "camera" : "iot";

        try {
            const response = await fetch("/api/task-accept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: data._id,
                    status: newStatus,
                    task: data.task._id,
                    type: type,
                }),
            });
            if (response.ok) {
                setStatus(newStatus);
                alert("Task Updated successfully");
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleReport = async () => {
        setIsModalOpen(false);
        router.push(`/dashboard/reports/${data._id}`);
    };

    return (
        <>
            <div
                className={`flex flex-col border items-start my-6 rounded-lg p-4 space-y-4 text-sm md:text-lg cursor-pointer shadow-lg transition-colors duration-300 ${
                    status === "in approval"
                        ? "bg-green-50"
                        : status === "in progress"
                        ? "bg-yellow-50"
                        : "bg-red-50"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between w-full">
                    <div className="font-bold">
                        <h1>Assigned to:</h1>
                        <p>{data.user.name}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p>{new Date(data.createdAt).toLocaleString()}</p>
                        <p>{data.status}</p>
                    </div>
                </div>
                <div className="flex flex-col w-full items-start">
                    <h1>Task:</h1>
                    <p>{data.description}</p>
                </div>
                <div className="flex flex-col w-full items-start">
                    <p>Device: {data.task.from_device.name}</p>
                    <p>Location: {data.task.from_device.from_location.name}</p>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="container flex flex-col items-center max-w-md">
                    <div className="flex items-center space-x-4 justify-around my-2">
                        <Image
                            src={data.user.profile_picture}
                            alt="user"
                            width={100}
                            height={100}
                            className="mx-auto rounded-full"
                        />
                        <p>Name: {data.user.name}</p>
                        <p>Email: {data.user.email}</p>
                        <p>Role: {data.user.role}</p>
                    </div>
                    <div className="text-center mb-2">
                        <p>Description:</p>
                        <p>{data.description}</p>
                    </div>
                    {isEventTask ? (
                        <div className="my-2 text-center">
                            <Image
                                src={data.task.event_picture ?? ""}
                                alt="event"
                                width={200}
                                height={200}
                                className="mx-auto my-2"
                            />
                            <p>Event Level: {data.task.event_level}</p>
                            <p>Event Type: {data.task.event_type}</p>
                            <p>Description: {data.task.description}</p>
                        </div>
                    ) : (
                        <div className="my-2 text-center">
                            <p>Temperature: {data.task.temperature}</p>
                            <p>Humidity: {data.task.humidity}</p>
                            <p>
                                Human presence:{" "}
                                {data.task.human_presence?.toString()}
                            </p>
                            <p>AQi: {data.task.AQI}</p>
                        </div>
                    )}
                    <div className="flex mt-4 space-x-4 text-sm text-center">
                        <div>
                            <p>Status: {status}</p>
                            <p>ID: {data._id}</p>
                            <p>
                                Created At:{" "}
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p>Device: {data.task.from_device.name}</p>
                            <p>
                                Location:{" "}
                                {data.task.from_device.from_location.name}
                            </p>
                        </div>
                    </div>

                    {status === "in approval" ? (
                        "bg-green-50"
                    ) : status === "in progress" ? (
                        <div className="flex space-x-6">
                            <button
                                onClick={handleAccept}
                                className="mt-4 bg-red-500 text-white rounded py-2 px-4 font-bold active:translate-y-1 shadow-lg duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReport}
                                className="mt-4 bg-green-500 text-white rounded py-2 px-4 font-bold active:translate-y-1 shadow-lg duration-150"
                            >
                                Report
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAccept}
                            className="mt-4 bg-primary text-white rounded py-2 px-4 font-bold active:translate-y-1 shadow-lg duration-150"
                        >
                            Accept
                        </button>
                    )}
                </div>
            </Modal>
        </>
    );
}
