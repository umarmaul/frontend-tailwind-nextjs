import { IotProps } from "@/types/iot";

interface TableProps {
    data: IotProps[];
}

export default function Table({ data }: TableProps) {
    if (!data || data.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <table className="min-w-full bg-white border">
            <thead>
                <tr>
                    <th className="py-2 border">Name</th>
                    <th className="py-2 border">Temperature (°C)</th>
                    <th className="py-2 border">Humidity (%)</th>
                    <th className="py-2 border">AQI</th>
                    <th className="py-2 border">Location</th>
                    <th className="py-2 border">Status</th>
                    <th className="py-2 border">Created At</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id} className="text-center">
                        <td className="py-2 border">{item.name}</td>
                        <td className="py-2 border">{item.temperature}</td>
                        <td className="py-2 border">{item.humidity}</td>
                        <td className="py-2 border">{item.AQI}</td>
                        <td className="py-2 border">
                            {item.from_location.name}
                        </td>
                        <td className="py-2 border">{item.status}</td>
                        <td className="py-2 border">
                            {new Date(item.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
