"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import FacilitiesCard from "@/components/FacilitiesCard";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/user";

export default function Facilities() {
    const [showAdd, setShowAdd] = useState(false);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState<string>("");
    const [selectedOperator, setSelectedOperator] = useState<string>("");
    const [addData, setAddData] = useState({
        name: "",
        description: "",
    });
    const [data, setData] = useState([
        {
            location: {
                _id: "",
                name: "",
                supervisor: { name: "" },
                operator: { name: "" },
                description: "",
            },
            events: {
                event_picture: "",
            },
            totalDevices: {
                sensor: 0,
                camera: 0,
            },
        },
    ]);

    const placeholderImage =
        "http://194.238.16.213:1122/event/event_picture_1723787821727.png";

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/all-user");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const toggleAdd = () => {
        setShowAdd(!showAdd);
        fetchFacilities();
        fetchUsers();
        setSelectedSupervisor("");
        setSelectedOperator("");
        setAddData({
            name: "",
            description: "",
        });
    };

    const addFacility = async () => {
        try {
            const res = await fetch("/api/facilities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: addData.name,
                    supervisor: selectedSupervisor,
                    operator: selectedOperator,
                    description: addData.description,
                }),
            });
            if (res.ok) {
                alert("Facility added successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            toggleAdd();
        }
    };

    const fetchFacilities = async () => {
        try {
            const res = await fetch("/api/facilities");
            const data = await res.json();
            setData(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    return (
        <div className="mx-auto max-w-6xl">
            <Breadcrumb pageName="Facilities" />
            <div className="mx-auto mt-8">
                <button
                    onClick={toggleAdd}
                    className="bg-primary text-white px-8 py-2 rounded-full text-center hover:bg-white hover:text-primary active:translate-y-1 shadow-xl"
                >
                    Add Device
                </button>
                <div className="flex flex-col space-y-10 mt-6">
                    {showAdd ? (
                        <div className="flex flex-col items-center justify-center space-y-10">
                            <div className="flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0 justify-center items-start">
                                <div className="flex flex-col space-y-4 text-xl">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="facilities name"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                    <label className="block mb-2">
                                        Supervisor
                                    </label>
                                    <select
                                        value={selectedSupervisor}
                                        onChange={(e) =>
                                            setSelectedSupervisor(
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded-lg w-full"
                                    >
                                        <option value="">
                                            Select a supervisor
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col space-y-4 text-xl">
                                    <label className="block mb-2">
                                        Operator
                                    </label>
                                    <select
                                        value={selectedOperator}
                                        onChange={(e) =>
                                            setSelectedOperator(e.target.value)
                                        }
                                        className="border p-2 rounded-lg w-full"
                                    >
                                        <option value="">
                                            Select a operator
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        placeholder="description"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                description: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={addFacility}
                                className="bg-primary text-xl text-white px-8 py-2 rounded-full text-center hover:bg-white hover:text-primary active:translate-y-1 shadow-xl"
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        data.map((facility, index) => (
                            <FacilitiesCard
                                key={index}
                                Props={{
                                    link: facility.location?._id,
                                    name: facility.location?.name,
                                    supervisor:
                                        facility.location?.supervisor.name,
                                    operator: facility.location?.operator.name,
                                    description: facility.location?.description,
                                    image:
                                        facility.events?.event_picture ||
                                        placeholderImage,
                                    camera: facility.totalDevices.camera,
                                    iot: facility.totalDevices.sensor,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
