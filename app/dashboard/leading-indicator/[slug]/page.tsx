import Breadcrumb from "@/components/Breadcrumbs";
import IotFacilitiesList from "@/components/IotFacilitiesList";

export default function VisualAnalysisPage() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Facilities / Details" />
            <IotFacilitiesList />
        </div>
    );
}
