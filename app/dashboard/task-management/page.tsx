import Breadcrumb from "@/components/Breadcrumbs";
import TaskManagementList from "@/components/TaskManagementList";

export default function TaskManagement() {
    return (
        <div className="container mx-auto">
            <Breadcrumb pageName="Task Management" />
            <TaskManagementList />
        </div>
    );
}
