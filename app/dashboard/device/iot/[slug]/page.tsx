import Breadcrumb from "@/components/Breadcrumbs";
import IotFacilitiesList from "@/components/IotFacilitiesList";

export default function IotFacilitiesPage() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Facilities / IoT" />
            <IotFacilitiesList />
        </div>
    );
}
