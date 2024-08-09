"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import IotDeviceList from "@/components/IotDeviceList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LocationProps } from "@/types/location";

export default function IotList() {
    const { slug } = useParams();
    const formattedSlug = Array.isArray(slug) ? slug[0] : slug;

    const [showAdd, setShowAdd] = useState(false);
    const [route, setRoute] = useState("");
    const [locations, setLocations] = useState<LocationProps[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [addData, setAddData] = useState({
        name: "",
        from_location: formattedSlug,
        identifier: "",
        ip_address: "",
        specification: "",
        type: "iot",
    });

    const fetchLocations = async () => {
        try {
            const res = await fetch("/api/all-location");
            const data = await res.json();
            setLocations(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("/api/all-location");
                const data = await res.json();
                setLocations(data);

                data.map((location: LocationProps) => {
                    if (location._id === formattedSlug) {
                        setRoute(location.name);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocations();
    }, [formattedSlug]);

    const addFacility = async () => {
        try {
            const res = await fetch("/api/add-device", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: addData.name,
                    from_location: selectedLocation,
                    identifier: addData.identifier,
                    ip_address: addData.ip_address,
                    specification: addData.specification,
                    type: addData.type,
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

    const toggleAdd = () => {
        setShowAdd(!showAdd);
        setAddData({
            name: "",
            from_location: "",
            identifier: "",
            ip_address: "",
            specification: "",
            type: "iot",
        });
        fetchLocations();
    };

    return (
        <div className="container mx-auto">
            <Breadcrumb pageName={`Facilities / ${route} / IoT`} />
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
                            <div className="flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0 justify-center items-start">
                                <div className="flex flex-col space-y-4 text-xl">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Device name"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="location">Location</label>
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) =>
                                            setSelectedLocation(e.target.value)
                                        }
                                        className="border p-2 rounded-lg w-full"
                                        id="location"
                                    >
                                        {locations.map((location) => (
                                            <option
                                                key={location._id}
                                                value={location._id}
                                            >
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="identifier">
                                        Identifier
                                    </label>
                                    <input
                                        type="text"
                                        id="identifier"
                                        placeholder="Device identifier"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                identifier: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col space-y-4 text-xl">
                                    <label htmlFor="ip_address">
                                        Ip address
                                    </label>
                                    <input
                                        type="text"
                                        id="ip_address"
                                        placeholder="Device ip address"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                ip_address: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="specification">
                                        Specification
                                    </label>
                                    <input
                                        type="text"
                                        id="specification"
                                        placeholder="Device specification"
                                        className="p-1 border-2 rounded-lg"
                                        onChange={(e) => {
                                            setAddData({
                                                ...addData,
                                                specification: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="type">Type</label>
                                    <select
                                        value={addData.type}
                                        onChange={(e) =>
                                            setAddData({
                                                ...addData,
                                                type: e.target.value,
                                            })
                                        }
                                        id="type"
                                        className="border p-2 rounded-lg w-full"
                                    >
                                        <option value="iot">iot</option>
                                        <option value="camera">camera</option>
                                    </select>
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
                        <IotDeviceList />
                    )}
                </div>
            </div>
        </div>
    );
}
