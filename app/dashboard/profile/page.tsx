"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<{
        [key: string]: string;
    }>({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        profile_picture: "",
    });

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div>
            <Breadcrumb pageName="Profile" />
            <div className="mx-auto w-full-p-12 text-center bg-white rounded-xl max-w-2xl">
                <Image
                    src={data.profile_picture}
                    alt=""
                    width={200}
                    height={200}
                    className="rounded-full mx-auto block my-6 "
                />
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <div className="text-xl p-6 space-y-2">
                        <h3>Username: {data.username}</h3>
                        <h2>Email: {data.email}</h2>
                        <h4 className="text-primary">Role: {data.role}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
