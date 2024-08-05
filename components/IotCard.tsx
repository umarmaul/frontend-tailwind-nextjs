import { IotProps } from "@/types/iot";

export default function IotCard({ data }: { data: IotProps }) {
    return (
        <div className="flex justify-around items-center text-center bg-white m-4 rounded-lg p-4 space-x-4 text-sm md:text-lg">
            <div className="flex flex-col">
                <p>Name: {data.name}</p>
                <p>From Location: {data.from_location.name}</p>
            </div>
            <div className="flex flex-col">
                <p>Temperature: {data.temperature}</p>
                <p>Humidity: {data.humidity}</p>
            </div>
            <div className="flex flex-col">
                <p>AQi: {data.AQI}</p>
                <p>Status: {data.status}</p>
            </div>
            <div className="md:flex flex-col hidden">
                <p>ID: {data._id}</p>
                <p>Created At: {data.createdAt.toString()}</p>
            </div>
        </div>
    );
}
