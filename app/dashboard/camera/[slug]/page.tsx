import Breadcrumb from "@/components/Breadcrumbs";
import CameraFacilitiesList from "@/components/CameraFacilitiesList";

export default function VisualAnalysisDetails() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Facilities / Camera" />
            <CameraFacilitiesList />
        </div>
    );
}
