import Image from "next/image";

export default function FacilitiesIot({ link }: any) {
    return (
        <div className="flex p-6 md:p-15 justify-center items-center bg-white rounded-lg shadow-lg border-t-10 border-primary max-w-xs md:max-w-xl">
            <div className="flex flex-col items-center text-center space-y-2">
                <Image
                    src="/iot-platform-svgrepo-com.svg"
                    alt="iot"
                    width={64}
                    height={64}
                />
                <h1 className="text-2xl font-bold capitalize">IoT</h1>
                <a
                    href={`/dashboard/device/iot-list/${link}`}
                    className="py-2 px-6 border rounded-lg bg-primary text-white hover:bg-purple-400 active:translate-y-1 shadow-lg duration-150 text-lg font-bold"
                >
                    View
                </a>
            </div>
        </div>
    );
}
