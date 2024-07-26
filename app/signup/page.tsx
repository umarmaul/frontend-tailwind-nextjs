"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const onSignup = async () => {
        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("password", user.password);
            if (profilePicture) {
                formData.append("profile_picture", profilePicture);
            }

            await axios.post(
                "http://194.238.16.213:1122/api/v1/create-user",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // This is a network or Axios-specific error
                console.error("Network or Axios error:", error.message);
            } else {
                // Handle other errors (if any)
                console.error("An unexpected error occurred:", error);
            }
        } finally {
            // Navigate to login page on successful signup
            router.push("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-primary bg-slate-200">
            <div className="flex space-x-6 bg-white rounded-lg items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full text-lg capitalize px-12 py-2">
                    <h1 className="text-4xl font-bold uppercase p-6">
                        Sign Up
                    </h1>
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        id="name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        placeholder="name"
                        className="text-center w-full px-4 py-2 border border-primary rounded-lg text-2xl shadow-xl"
                    />
                    <label htmlFor="username" className="pt-4">
                        username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        placeholder="username"
                        className="text-center w-full px-4 py-2 border border-primary rounded-lg text-2xl shadow-xl"
                    />
                    <label htmlFor="email" className="pt-4">
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
                    <label htmlFor="password" className="pt-4">
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
                    <label htmlFor="profile_picture" className="pt-4">
                        Profile Picture
                    </label>
                    <input
                        id="profile_picture"
                        type="file"
                        onChange={(e) =>
                            setProfilePicture(e.target.files?.[0] || null)
                        }
                        className="text-center w-full px-4 py-2 border border-primary rounded-lg text-2xl shadow-xl"
                    />

                    <button
                        onClick={onSignup}
                        className="mt-6 mb-2 p-2 w-full border bg-primary text-white rounded-lg text-2xl shadow-xl hover:bg-white hover:text-primary duration-200"
                    >
                        Sign Up
                    </button>

                    <Link
                        href="/login"
                        className="hover:text-purple-400 duration-200"
                    >
                        Visit login page
                    </Link>
                </div>
            </div>
        </div>
    );
}
