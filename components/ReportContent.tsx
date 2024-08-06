import { IotProps } from "@/types/iot";
import Table from "@/components/Table";
import Image from "next/image";

export interface ReportData {
    name: string;
    email: string;
    reportDetails: string;
    choice: string;
    signature: string;
}

interface ReportContentProps {
    data: ReportData;
    tableData: IotProps[];
}

export default function ReportContent({ data, tableData }: ReportContentProps) {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Laporan</h1>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Detail Pengguna</h2>
                <p>
                    <strong>Nama:</strong> {data.name}
                </p>
                <p>
                    <strong>Email:</strong> {data.email}
                </p>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Detail Laporan</h2>
                <p>{data.reportDetails}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Pilihan</h2>
                <p>{data.choice}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Data Tabel</h2>
                <Table data={tableData} />
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Tanda Tangan</h2>
                {data.signature && (
                    <Image
                        src={data.signature}
                        alt="Tanda Tangan"
                        width={300}
                        height={300}
                        className="border border-gray-300 rounded-md"
                    />
                )}
            </div>

            <div className="mt-8">
                <p>Mengetahui,</p>
                <p className="mt-16">{data.name}</p>
            </div>

            <div className="mt-8">
                <p className="text-right text-sm text-gray-500">Halaman 1</p>
            </div>

            <div
                className="page-break"
                style={{ pageBreakAfter: "always" }}
            ></div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Lampiran</h2>
                <p>
                    Data tambahan atau lampiran lainnya dapat ditampilkan di
                    sini.
                </p>
            </div>

            <div className="mt-8">
                <p className="text-right text-sm text-gray-500">Halaman 2</p>
            </div>
        </div>
    );
}
