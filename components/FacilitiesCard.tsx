import Image from "next/image";

const FacilitiesCard = ({ Props }: { Props: any }) => {
    return (
        <div className="flex justify-around space-x-6 items-start bg-white px-12 py-3 rounded-xl h-40">
            <div>
                <Image
                    src={Props.image}
                    alt=""
                    width={120}
                    height={120}
                    className="rounded-xl"
                />
            </div>
            <div className="w-1/4 text-lg">
                <h1 className="text-primary font-bold">Name: {Props.name}</h1>
                <div>
                    <p>Supervisor: {Props.supervisor}</p>
                    <h2>Operator: {Props.operator}</h2>
                </div>
            </div>
            <div className="w-1/4 space-y-2 text-md">
                <h1 className="font-bold">Description</h1>
                <p>{Props.description}</p>
            </div>
            <div className="w-1/4 space-y-2 text-md">
                <h1 className="font-bold">Devices</h1>
                <div>
                    <p>Camera: {Props.camera}</p>
                    <p>IoT: {Props.iot}</p>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesCard;
