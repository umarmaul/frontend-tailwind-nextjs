import ReportForm from "@/components/ReportForm";

export default function ReportPage({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Laporan Task</h1>
            <ReportForm slug={params.slug} />
        </div>
    );
}
