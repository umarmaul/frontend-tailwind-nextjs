import { useState, useEffect } from "react";
import { IotProps } from "@/types/iot";
import { UserProps } from "@/types/user";
import Modal from "@/components/Modal";

export default function IotCard({ data }: { data: IotProps }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(data.status);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/all-user");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchUsers();
        }
    }, [isModalOpen]);

    const toggleStatus = async () => {
        const newStatus = status === "unassigned" ? "resolved" : "unassigned";
        try {
            const response = await fetch("/api/sensor-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data._id, status: newStatus }),
            });
            if (response.ok) {
                setStatus(newStatus);
                setIsModalOpen(false);
                alert("Status updated successfully");
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task: data._id,
                    description,
                    user: selectedUser,
                    type: "iot",
                }),
            });
        } catch (error) {
            console.error("Error submitting task:", error);
        } finally {
            setIsModalOpen(false);
            setDescription("");
            setSelectedUser("");
            alert("Task added successfully");
        }
    };

    return (
        <>
            <div
                className={`flex flex-col justify-center border items-start my-6 rounded-lg p-4 space-x-4 text-sm md:text-lg cursor-pointer transition-colors duration-300 shadow-lg ${
                    status === "resolved" ? "bg-green-50" : "bg-red-50"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between w-full px-4 items-center">
                    <p className="text-md font-medium text-lg md:text-2xl">
                        {data.from_device?.name}
                    </p>
                    <p className="text-md border border-black p-1 rounded-lg bg-slate-100">
                        {data.from_device?.from_location?.name}
                    </p>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col w-full mt-2">
                        <p className="font-light text-xs md:text-sm my-2">
                            {data._id}
                        </p>
                        <p>Temperature: {data.temperature}</p>
                        <p>Humidity: {data.humidity}</p>
                        <p>AQi: {data.AQI}</p>
                        <p>Human Presence: {data.human_presence.toString()}</p>
                    </div>
                    <div className="flex flex-col w-full pr-8 mt-10">
                        <p>Status: {status}</p>
                        <p className="font-bold">
                            {status === "resolved"
                                ? "resolved"
                                : "Waiting for assignment"}
                        </p>
                        <p>
                            Date: {data.createdAt.toString().substring(0, 10)}
                        </p>
                        <p>
                            Time: {data.createdAt.toString().substring(11, 19)}
                        </p>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col">
                    <p>Device: {data.from_device?.name}</p>
                    <p>Location: {data.from_device?.from_location?.name}</p>
                    <p>Temperature: {data.temperature}</p>
                    <p>Humidity: {data.humidity}</p>
                    <p>AQi: {data.AQI}</p>
                    <p>Human Presence: {data.human_presence.toString()}</p>
                    <p>Status: {status}</p>
                    <p>ID: {data._id}</p>
                    <p>
                        Created At: {new Date(data.createdAt).toLocaleString()}
                    </p>
                    <div
                        className={`mt-4 ${
                            status === "unassigned" ? "block" : "hidden"
                        }`}
                    >
                        <label className="block mb-2">Assigned to:</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div
                        className={`mt-4 ${
                            status === "unassigned" ? "block" : "hidden"
                        }`}
                    >
                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 rounded w-full"
                        ></textarea>
                    </div>
                    {status === "unassigned" && (
                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-primary text-white py-2 px-4 rounded"
                        >
                            Submit Task
                        </button>
                    )}
                    <button
                        onClick={toggleStatus}
                        className="mt-4 bg-red-500 text-white rounded p-2 uppercase"
                    >
                        anomali
                    </button>
                </div>
            </Modal>
        </>
    );
}
