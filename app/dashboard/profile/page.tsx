"use client";

import Breadcrumb from "@/components/Breadcrumbs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data.data);
        setData(res.data.data._id);
    };

    return (
        <div>
            <Breadcrumb pageName="profile" />
            <h1>Profile</h1>
            <h2>userID = {data === "nothing" ? "Nothing" : data}</h2>
            <button onClick={getUserDetails}>Details</button>
        </div>
    );
}
