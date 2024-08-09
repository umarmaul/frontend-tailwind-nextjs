import { EventProps } from "@/types/event";
import { UserProps } from "@/types/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";

export default function EventCard({ data }: { data: EventProps }) {
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
            console.error("Error submitting task:", error);
        } finally {
            setIsModalOpen(false);
            setDescription("");
            setSelectedUser("");
        }
    };

    return (
        <>
            <div
                className={`flex justify-around items-center my-6 border rounded-lg p-4 space-x-4 text-sm md:text-lg shadow-lg cursor-pointer transition-colors duration-300 ${
                    status === "approved" ? "bg-green-50" : "bg-red-50"
                }`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="container w-full flex flex-1 justify-around items-center rounded-lg md:space-x-6 text-sm md:text-lg">
                    <Image
                        src={data.event_picture}
                        alt="user"
                        width={2150}
                        height={250}
                        className="object-cover rounded-xl md:w-[177px] md:h-[100px] w-[133px] h-[75px]"
                    />
                    <div className="flex flex-col px-2 w-full space-x-12 md:space-x-4">
                        <div className="flex justify-around w-full space-x-4">
                            <div className="">{data.event_level}</div>
                            <div className="">{data.event_type}</div>
                            <div className="flex flex-col">
                                <p>{data.from_device?.name}</p>
                                <p>{data.from_device?.from_location?.name}</p>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col w-full text-md">
                            <p className="text-sm py-2">{data.description}</p>
                            <p>Status: {status}</p>
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
                <div>
                    <div className="flex space-x-6 items-center">
                        <Image
                            src={data.event_picture}
                            alt="user"
                            width={250}
                            height={250}
                            className="object-cover rounded-xl md:w-[177px] md:h-[100px] w-[133px] h-[75px]"
                        />
                        <div className="flex flex-col max-w-xs">
                            <div className="flex justify-between py-2">
                                <p>{data.event_level}</p>
                                <p>{data.event_type}</p>
                            </div>
                            <div className="text-sm py-2">
                                {data.description}
                            </div>
                            <div className="flex flex-col py-2">
                                <p>Device: {data.from_device?.name}</p>
                                <p>
                                    Location:{" "}
                                    {data.from_device?.from_location?.name}
                                </p>
                                <p>Status: {status}</p>
                            </div>
                            <p>ID: {data._id}</p>
                            <p>
                                Created At:{" "}
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

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
                    <div className="flex flex-col">
                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-primary text-white py-2 px-4 rounded"
                        >
                            Submit Task
                        </button>
                        <button
                            onClick={toggleStatus}
                            className="mt-4 bg-primary text-white rounded p-2"
                        >
                            Toggle Status
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
