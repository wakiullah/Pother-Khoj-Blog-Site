import DashboardHighlights from "@/components/admin/dashboardHighlits";
import { userVerify } from "@/utilitis/userVerify";

export default async function Dashboard() {
    const user = await userVerify();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    Welcome, {user?.username || "User"}!
                </h2>
                <p className="text-gray-600">Email: {user?.email || "Not available"}</p>
            </div>
            <div>
                <DashboardHighlights />
            </div>
        </div>
    );
}