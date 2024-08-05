import Breadcrumb from "@/components/Breadcrumbs";
import LeadingIndicatorList from "@/components/LeadingIndicatorList";

export default function leadingIndicator() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Leading Indicator" />
            <LeadingIndicatorList />
        </div>
    );
}
