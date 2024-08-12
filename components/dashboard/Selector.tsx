export default function Selector() {
    return (
        <div className="flex space-x-2 justify-between items-center mb-6">
            <h1 className="lg:text-3xl text-lg font-bold text-primary">
                Control Room / Overview
            </h1>
            <div className="flex lg:space-x-4 space-x-1 text-xs lg:text-lg">
                <select
                    // value={selectedUser}
                    // onChange={(e) => setSelectedUser(e.target.value)}
                    className="border p-2 rounded-lg bg-dark-7"
                >
                    <option value="">Room 3</option>
                    {/* {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))} */}
                </select>
                <select
                    // value={selectedUser}
                    // onChange={(e) => setSelectedUser(e.target.value)}
                    className="border p-2 rounded-lg bg-dark-7"
                >
                    <option value="">Daily</option>
                    {/* {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))} */}
                </select>
                <select
                    // value={selectedUser}
                    // onChange={(e) => setSelectedUser(e.target.value)}
                    className="border p-2 rounded-lg bg-dark-7"
                >
                    <option value="">8/8/24</option>
                    {/* {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))} */}
                </select>
            </div>
        </div>
    );
}
