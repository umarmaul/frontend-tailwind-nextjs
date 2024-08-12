export default function TaskManagement() {
    return (
        <div className="flex flex-col">
            <h3 className="text-3xl font-medium text-primary mb-2">
                Tasks management
            </h3>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-x-6 lg:space-y-0 w-full">
                {/* Incidences */}
                <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-full">
                    <h4 className="my-2 text-lg font-bold text-gray-800">
                        Incidences
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-600 uppercase text-sm tracking-wider">
                                    <th className="py-3 border-b">No</th>
                                    <th className="py-3 border-b">Hazard</th>
                                    <th className="py-3 border-b">Time</th>
                                    <th className="py-3 border-b">PIC</th>
                                    <th className="py-3 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="hover:bg-gray-100">
                                    <td className="py-3 border-b">1</td>
                                    <td className="py-3 border-b">
                                        Ergonomics
                                    </td>
                                    <td className="py-3 border-b">14.42</td>
                                    <td className="py-3 border-b">John D</td>
                                    <td className="py-3 border-b">
                                        <span className="bg-lime-400">
                                            Resolved
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Action needed */}
                <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-full">
                    <h4 className="my-2 text-lg font-bold text-gray-800">
                        Actions needed
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-600 uppercase text-sm tracking-wider">
                                    <th className="py-3 border-b">No</th>
                                    <th className="py-3 border-b">Action</th>
                                    <th className="py-3 border-b">Hazard</th>
                                    <th className="py-3 border-b">Date</th>
                                    <th className="py-3 border-b">PIC</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="hover:bg-gray-100">
                                    <td className="py-3 border-b">1</td>
                                    <td className="py-3 border-b">
                                        Quality check
                                    </td>
                                    <td className="py-3 border-b">Air</td>
                                    <td className="py-3 border-b">11/8/2024</td>
                                    <td className="py-3 border-b">David H</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
