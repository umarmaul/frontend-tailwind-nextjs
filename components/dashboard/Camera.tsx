import Image from "next/image";

export default function Camera() {
    return (
        <div className="flex flex-col w-full h-full lg:max-w-md">
            <h3 className="text-3xl font-medium text-primary mb-2">Camera</h3>
            <div className="flex flex-col space-y-6 h-full justify-center w-full">
                {/* card 1 */}
                <div className="flex bg-white p-4 space-x-6">
                    <Image
                        src={"/images/Group8.svg"}
                        alt="cctv"
                        height={150}
                        width={250}
                        className="object-cover rounded-lg md:w-[177px] md:h-[100px] w-[133px] h-[75px]"
                    />
                    <div className="flex flex-col px-6">
                        <p>14.42</p>
                        <p>Improper posture</p>
                        <p>Aaron D</p>
                    </div>
                </div>
                {/* card 1 */}
                <div className="flex bg-white p-4 space-x-6">
                    <Image
                        src={"/images/Group9.svg"}
                        alt="cctv"
                        height={150}
                        width={250}
                        className="object-cover rounded-lg md:w-[177px] md:h-[100px] w-[133px] h-[75px]"
                    />
                    <div className="flex flex-col px-6">
                        <p>14.42</p>
                        <p>Improper posture</p>
                        <p>Unknown</p>
                    </div>
                </div>
                {/* card 1 */}
                <div className="flex bg-white p-4 space-x-6">
                    <Image
                        src={"/images/Group10.svg"}
                        alt="cctv"
                        height={150}
                        width={250}
                        className="object-cover rounded-lg md:w-[177px] md:h-[100px] w-[133px] h-[75px]"
                    />
                    <div className="flex flex-col px-6">
                        <p>09.28</p>
                        <p>Person detected</p>
                        <p>Room 3</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
