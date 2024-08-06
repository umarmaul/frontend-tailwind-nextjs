"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SignatureCanvas from "react-signature-canvas";
import ReportContent, { ReportData } from "./ReportContent";
import { IotProps } from "@/types/iot";

export default function Form() {
    const formRef = useRef<HTMLDivElement>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const [data, setData] = useState<ReportData>({
        name: "",
        email: "",
        reportDetails: "",
        choice: "",
        signature: "",
    });

    const [tableData, setTableData] = useState<IotProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/leading-indicator");
            const result = await response.json();
            setTableData(result.sensorData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => formRef.current,
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClearSignature = () => {
        sigCanvas.current?.clear();
        setData((prevData) => ({
            ...prevData,
            signature: "",
        }));
    };

    const handleSaveSignature = () => {
        if (sigCanvas.current) {
            setData((prevData: ReportData) => ({
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
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Detail Laporan:
                        </label>
                        <textarea
                            name="reportDetails"
                            value={data.reportDetails}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Pilihan:
                        </label>
                        <select
                            name="choice"
                            value={data.choice}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Pilih salah satu</option>
                            <option value="option1">Opsi 1</option>
                            <option value="option2">Opsi 2</option>
                            <option value="option3">Opsi 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tanda Tangan:
                        </label>
                        <SignatureCanvas
                            penColor="black"
                            ref={sigCanvas}
                            canvasProps={{
                                width: 500,
                                height: 200,
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
                        <ReportContent data={data} tableData={tableData} />
                    </div>
                </div>
            )}
        </div>
    );
}
