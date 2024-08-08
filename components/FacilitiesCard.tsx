import Image from "next/image";

export default function FacilitiesCard({ Props }: { Props: any }) {
    return (
        <a
            href={`/dashboard/facilities/${Props.link}`}
            className="flex justify-center space-x-2 items-center bg-white md:px-12 px-2 py-2 rounded-xl h-40"
        >
            <div>
                <Image
                    src={Props.image}
                    alt=""
                    width={200}
                    height={200}
                    className="rounded-xl"
                />
            </div>
            <div className="flex flex-1 space-x-2 justify-around px-4">
                <div className="w-1/4 text-md md:text-xl">
                    <h1 className="text-primary font-bold">{Props.name}</h1>
                    <div>
                        <p>Supervisor: {Props.supervisor}</p>
                        <h2>Operator: {Props.operator}</h2>
                    </div>
                </div>
                <div className="w-1/4 space-y-2 md:text-xl text-md">
                    <h1 className="font-bold">Description</h1>
                    <p>{Props.description}</p>
                </div>
                <div className="w-1/4 space-y-2 md:text-xl text-sm hidden md:block">
                    <h1 className="font-bold">Alerts</h1>
                    <div>
                        <p>Camera: {Props.camera}</p>
                        <p>IoT: {Props.iot}</p>
                    </div>
                </div>
            </div>
        </a>
    );
}
