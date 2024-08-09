import { DeviceProps } from "@/types/device";

export default function DeviceCard({ data }: { data: DeviceProps }) {
    return (
        <a
            className="flex flex-col justify-center border items-start my-6 rounded-lg p-4 space-x-4 text-sm md:text-lg cursor-pointer transition-colors duration-300 bg-white shadow-lg"
            href={`${
                data.type === "iot"
                    ? "/dashboard/device/iot"
                    : "/dashboard/device/camera"
            }/${data._id}`}
        >
            <div className="flex justify-between w-full px-4 items-center">
                <p className="text-md font-medium text-lg md:text-3xl">
                    {data.name}
                </p>
                <p className="text-md border border-black p-1 rounded-lg bg-slate-100">
                    {data.from_location?.name}
                </p>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-full mt-2">
                    <p className="font-light text-xs md:text-sm my-2">
                        {data._id}
                    </p>
                    <p>Specification: {data.specification}</p>
                    <p>Ip_address: {data.ip_address}</p>
                    <p>Type: {data.type}</p>
                </div>
                <div className="flex flex-col w-full pr-8 mt-10">
                    <p>
                        Date Created:{" "}
                        {data.createdAt.toString().substring(0, 10)}
                    </p>
                    <p>
                        Time Created:{" "}
                        {data.createdAt.toString().substring(11, 19)}
                    </p>
                    <p>Alerts: {data.totalAlerts}</p>
                </div>
            </div>
        </a>
    );
}
