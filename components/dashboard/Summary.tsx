export default function Summary() {
    return (
        <div className="mt-4">
            <h2 className="text-3xl font-medium text-primary">Summary</h2>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mt-2 justify-center w-full h-full">
                {/* Card 1*/}
                <div className="flex flex-col items-start justify-start bg-white border p-4 rounded-lg w-full">
                    <h3 className="font-bold text-lg">Sensor count</h3>
                    <div className="flex space-x-4 items-center justify-around text-lg w-full h-full">
                        <div className="flex flex-col text-primary">
                            <p>CCTV</p>
                            <p>Air</p>
                        </div>
                        <div className="flex flex-col">
                            {/* baris 1 */}
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="lime"
                                        />
                                    </svg>
                                    <p>2</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="red"
                                        />
                                    </svg>
                                    <p>1</p>
                                </div>
                            </div>
                            {/* baris 2 */}
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="lime"
                                        />
                                    </svg>
                                    <p>4</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="red"
                                        />
                                    </svg>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col text-primary">
                            <p>Temperature</p>
                            <p>Sound</p>
                        </div>
                        <div className="flex flex-col">
                            {/* baris 1 */}
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="lime"
                                        />
                                    </svg>
                                    <p>6</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="red"
                                        />
                                    </svg>
                                    <p>0</p>
                                </div>
                            </div>
                            {/* baris 2 */}
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="lime"
                                        />
                                    </svg>
                                    <p>1</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        height="10"
                                        width="10"
                                        className="animate-pulse-smooth"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4"
                                            strokeWidth="0.4"
                                            fill="red"
                                        />
                                    </svg>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="flex flex-col items-start justify-start bg-white border p-4 rounded-lg w-full">
                    <h3 className="font-bold text-lg">Hazardous events</h3>
                    <div className="flex space-x-4 mx-auto items-center h-full">
                        <p className="text-primary font-bold text-6xl">13</p>
                        <div className="flex flex-col">
                            <p>
                                <span className="text-primary font-bold">
                                    6
                                </span>{" "}
                                Area
                            </p>
                            <p>
                                {" "}
                                <span className="text-primary font-bold">
                                    3
                                </span>{" "}
                                Ergonmics
                            </p>
                            <p>
                                {" "}
                                <span className="text-primary font-bold">
                                    3
                                </span>{" "}
                                Air
                            </p>
                        </div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="flex flex-col items-start justify-start bg-white border p-4 rounded-lg w-full">
                    <h3 className="font-bold text-lg">Task management</h3>
                    <div className="flex space-x-4 text-center mx-auto items-center justify-around w-full">
                        <div className="flex flex-col">
                            <p className="text-primary font-bold text-6xl">8</p>
                            <p>Resolved</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-primary font-bold text-6xl">4</p>
                            <p>On-process</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-primary font-bold text-6xl">1</p>
                            <p>Unassigned</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
