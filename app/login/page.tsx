"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            router.push("/dashboard");
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-primary bg-slate-200">
            <div className="flex flex-col rounded-xl space-y-4 bg-white items-center justify center p-12 max-w-6xl">
                <h1 className="text-4xl font-bold uppercase">
                    {loading ? "Processing" : "Login"}
                </h1>
                <label htmlFor="email" className="text-2xl capitalize pt-2">
                    email
                </label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    placeholder="email"
                    className="text-center w-full px-4 py-2 border border-primary rounded-lg text-2xl shadow-xl"
                />
                <label htmlFor="password" className="text-2xl capitalize pt-2">
                    password
                </label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    placeholder="password"
                    className="text-center w-full px-4 py-2 border border-primary rounded-lg text-2xl shadow-xl"
                />
                <button
                    onClick={onLogin}
                    className="w-full p-2 bg-primary text-white text-2xl rounded-lg uppercase hover:bg-white hover:text-primary shadow-lg duration-150"
                >
                    login
                </button>
                <Link href="/signup" className="hover:text-purple-400">
                    Visit signup page
                </Link>
            </div>
        </div>
    );
}
