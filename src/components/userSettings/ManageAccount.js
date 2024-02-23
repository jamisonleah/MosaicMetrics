import { useState } from "react"

const ManageAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex p-8 w-full mx-auto text-black gap-4">
            <div>
                <div className="mb-2">
                    <label className="block mb-2 text-gray-600">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-gray-600">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-gray-600">Password</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 w-full border rounded"
                    />
                </div>
            </div>
        </div>
    )
}
export default ManageAccount;
