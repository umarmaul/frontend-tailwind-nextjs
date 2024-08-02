import Breadcrumb from "@/components/Breadcrumbs";
import FacilitiesCamera from "@/components/FacilitiesCamera";
import FacilitiesIot from "@/components/FacilitiesIot";

export default function Details_Facilities({ params: { slug } }: any) {
    return (
        <div className="mx-auto max-w-6xl">
            <Breadcrumb pageName={`Facilities / Details`} />
            <div className="flex justify-center space-x-6 items-center min-h-[50vh] min-w-4xl">
                <FacilitiesIot link={slug} />
                <FacilitiesCamera link={slug} />
            </div>
        </div>
    );
}
