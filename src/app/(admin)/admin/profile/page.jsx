import {userVerify} from "@/utilitis/userVerify";

export default async function AdminProfilePage() {

    const user = await userVerify();

    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Username: {user.username}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>

        </div>
    );
}