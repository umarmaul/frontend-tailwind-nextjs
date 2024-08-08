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
                }),
            });
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setIsModalOpen(false);
            setDescription("");
            setSelectedUser("");
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
                    <div className="mt-4">
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
                    <div className="mt-4">
                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 rounded w-full"
                        ></textarea>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Submit Task
                    </button>
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
