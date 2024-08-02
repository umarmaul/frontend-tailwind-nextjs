"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import FacilitiesCard from "@/components/FacilitiesCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Facilities() {
    const [showAdd, setShowAdd] = useState(false);
    const [addData, setAddData] = useState({
        name: "",
        supervisor: "",
        operator: "",
        description: "",
    });
    const [data, setData] = useState([
        {
            location: {
                name: "",
                supervisor: { name: "" },
                operator: { name: "" },
                description: "",
            },
            events: {
                event_picture: "",
            },
        },
    ]);

    const toggleAdd = () => {
        setShowAdd(!showAdd);
        fetchFacilities();
    };

    const addFacility = async () => {
        try {
            const res = await axios.post("/api/facilities", addData);
            console.log(res.data);
            if (res.data.success) {
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
            const res = await axios.get("/api/facilities");
            console.log(res.data.data);
            setData(res.data.data);
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
                    Add Facility
                </button>
                <div className="flex flex-col space-y-10 mt-6">
                    {showAdd ? (
                        <div className="flex flex-col items-center justify-center space-y-10">
                            <div className="flex space-x-16 justify-center items-start">
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
                                    <label htmlFor="supervisor">
                                        Supervisor
                                    </label>
                                    <input
                                        type="text"
                                        id="supervisor"
                                        placeholder="supervisor_id"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                supervisor: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col space-y-4 text-xl">
                                    <label htmlFor="operator">Operator</label>
                                    <input
                                        type="text"
                                        id="operator"
                                        placeholder="operator_id"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                operator: e.target.value,
                                            });
                                        }}
                                    />
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
                                    name: facility.location.name,
                                    supervisor:
                                        facility.location.supervisor.name,
                                    operator: facility.location.operator.name,
                                    description: facility.location.description,
                                    image: facility.events.event_picture,
                                    camera: "Yes",
                                    iot: "Yes",
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
