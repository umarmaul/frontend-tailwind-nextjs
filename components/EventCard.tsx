import { EventProps } from "@/types/event";
import Image from "next/image";

export default function EventCard({ data }: { data: EventProps }) {
    return (
        <div className="container flex flex-1 justify-around items-center bg-white my-4 rounded-lg p-4 md:space-x-6 text-sm md:text-lg">
            <Image
                src={data.event_picture}
                alt="user"
                width={250}
                height={250}
                className="object-cover rounded-xl md:w-[266px] md:h-[150px] w-[133px] h-[75px]"
            />
            <div className="flex flex-1 items-start py-2 px-6 md:px-0 md:pr-6 space-x-12 md:space-x-4">
                <div className="flex flex-col w-1/4">
                    <p>Level: {data.event_level}</p>
                    <p>Type: {data.event_type}</p>
                </div>
                <div className="hidden md:flex flex-col w-1/4">
                    <p>Description: {data.description}</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <p>Camera: {data.from_camera.name}</p>
                    <p>Status: {data.status}</p>
                </div>
                <div className="md:flex flex-col hidden w-1/4">
                    <p>ID: {data._id}</p>
                    <p>Created At: {data.createdAt.toString()}</p>
                </div>
            </div>
        </div>
    );
}
