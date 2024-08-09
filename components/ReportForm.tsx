"use client";

import { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";
import { TaskProps } from "@/types/task";
import { ReportProps } from "@/types/report";
import { UserProps } from "@/types/user";

export default function ReportForm({ slug }: { slug: string }) {
    const formRef = useRef<HTMLDivElement>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const [taskData, setTaskData] = useState<TaskProps | null>(null);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [reportData, setReportData] = useState<Partial<ReportProps>>({
        report_type: "",
        reporter: {
            _id: "",
            name: "",
            email: "",
        },
        reported_to: {
            _id: "",
            name: "",
            email: "",
        },
        task: {
            _id: "",
            event_level: "",
            event_type: "",
            event_picture: "",
            description: "",
            temperature: 0,
            humidity: 0,
            human_presence: false,
            AQI: 0,
            from_device: {
                _id: "",
                name: "",
                from_location: {
                    _id: "",
                    name: "",
                },
            },
            status: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0,
        },
        report_details: "",
        status: "",
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            // Fetch task data by slug
            const taskResponse = await fetch(`/api/single-task/${slug}`);
            const taskResult = await taskResponse.json();
            setTaskData(taskResult);

            // Fetch users for reported_to selection
            const usersResponse = await fetch("/api/all-user");
            const usersResult = await usersResponse.json();
            setUsers(usersResult);

            setLoading(false);
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        if (taskData) {
            setReportData((prevData) => ({
                ...prevData,
                task: taskData.task,
                reporter: {
                    _id: taskData.user._id,
                    name: taskData.user.name,
                    email: taskData.user.email,
                },
                status: taskData.status,
            }));
        }
    }, [taskData]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setReportData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePrint = useReactToPrint({
        content: () => formRef.current,
    });

    const handleClearSignature = () => {
        sigCanvas.current?.clear();
        setReportData((prevData) => ({
            ...prevData,
            signature: "",
        }));
    };

    const handleSaveSignature = () => {
        if (sigCanvas.current) {
            setReportData((prevData) => ({
                ...prevData,
                signature: sigCanvas.current
                    ?.getTrimmedCanvas()
                    .toDataURL("image/png") as string,
            }));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Formulir Laporan</h2>
                {!loading && taskData && (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Pelapor:
                            </label>
                            <input
                                type="text"
                                name="reporter_name"
                                value={reportData.reporter?.name || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Pelapor:
                            </label>
                            <input
                                type="email"
                                name="reporter_email"
                                value={reportData.reporter?.email || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Laporan Kepada:
                            </label>
                            <select
                                name="reported_to"
                                value={reportData.reported_to?._id || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Pilih User</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Detail Laporan:
                            </label>
                            <textarea
                                name="report_details"
                                value={reportData.report_details || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tanda Tangan:
                            </label>
                            <SignatureCanvas
                                penColor="black"
                                ref={sigCanvas}
                                canvasProps={{
                                    width: 100,
                                    height: 100,
                                    className:
                                        "border-2 border-gray-300 rounded-md",
                                }}
                                onEnd={handleSaveSignature}
                            />
                            <button
                                type="button"
                                onClick={handleClearSignature}
                                className="mt-2 text-blue-500"
                            >
                                Hapus Tanda Tangan
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <button
                onClick={handlePrint}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                Unduh sebagai PDF
            </button>

            {!loading && (
                <div className="hidden">
                    <div ref={formRef}>
                        {/* Sesuaikan dengan komponen ReportContent */}
                        {/* <ReportContent data={reportData} /> */}
                    </div>
                </div>
            )}
        </div>
    );
}
