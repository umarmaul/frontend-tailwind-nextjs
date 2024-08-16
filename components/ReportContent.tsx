// SELANJUTNYA INI HARUS DISELESAIKAN

import { IotProps } from "@/types/iot";
import Table from "@/components/Table";
import Image from "next/image";

export interface ReportData {
    name: string;
    email: string;
    reportDetails: string;
    signature: string;
}

interface ReportContentProps {
    data: ReportData;
    tableData: IotProps[];
}

export default function ReportContent({ data, tableData }: ReportContentProps) {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Report</h1>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">User Details</h2>
                <p>
                    <strong>Name:</strong> {data.name}
                </p>
                <p>
                    <strong>Email:</strong> {data.email}
                </p>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Report Description</h2>
                <p>{data.reportDetails}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Table Data</h2>
                <Table data={tableData} />
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Sign</h2>
                {data.signature && (
                    <Image
                        src={data.signature}
                        alt="Tanda Tangan"
                        width={200}
                        height={100}
                        className="border border-gray-300 rounded-md"
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="mt-2">{data.name}</p>
            </div>

            <div className="mt-8">
                <p className="text-right text-sm text-gray-500">Page 1</p>
            </div>
        </div>
    );
}
