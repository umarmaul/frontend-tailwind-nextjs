import SensorGraph from "./Graph";

export default function Sensors() {
    return (
        <div className="flex flex-col w-full h-full">
            <h3 className="text-3xl font-medium text-primary">Sensors</h3>
            <div className="bg-white rounded-lg p-4 my-2">
                <div className="flex flex-col space-y-4 justify-start">
                    <div className="flex space-x-4">
                        <select
                            // value={selectedUser}
                            // onChange={(e) => setSelectedUser(e.target.value)}
                            className="border p-2 rounded-lg bg-dark-8"
                        >
                            <option value="">Select a room</option>
                            {/* {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))} */}
                        </select>
                        <select
                            // value={selectedUser}
                            // onChange={(e) => setSelectedUser(e.target.value)}
                            className="border p-2 rounded-lg bg-dark-8"
                        >
                            <option value="">Select a room</option>
                            {/* {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))} */}
                        </select>
                    </div>
                    <SensorGraph />
                    <div className="flex space-x-4 pl-10 text-sm">
                        <p className="bg-lime-400">
                            No major Temperature hazard
                        </p>
                        <p className="bg-yellow-300">
                            Higher acitivity in 10-14 in the last 2 weeks
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
