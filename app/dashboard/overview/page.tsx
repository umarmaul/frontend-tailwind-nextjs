import Camera from "@/components/dashboard/Camera";
import Selector from "@/components/dashboard/Selector";
import Sensors from "@/components/dashboard/Sensors";
import Summary from "@/components/dashboard/Summary";
import TaskManagement from "@/components/dashboard/TaskManagement";

export default function dashboard() {
    return (
        <div className="container mx-auto min-w-6xl">
            <Selector />
            <Summary />
            <div className="flex flex-col lg:flex-row my-4 lg:space-x-6 space-y-4 lg:space-y-0 w-full h-full items-start">
                <Sensors />
                <Camera />
            </div>
            <TaskManagement />
        </div>
    );
}
