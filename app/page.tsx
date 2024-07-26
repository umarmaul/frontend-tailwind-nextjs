"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const Router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            Router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
