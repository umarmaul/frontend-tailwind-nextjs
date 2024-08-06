import Breadcrumb from "@/components/Breadcrumbs";
import VisualAnalysisList from "@/components/VisualAnalysisList";

export default function VisualAnalysis() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Visual Analysis" />
            <VisualAnalysisList />
        </div>
    );
}
