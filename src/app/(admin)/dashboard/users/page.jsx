import UsersList from "@/components/admin/usersList";

export default function UserDashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
            <UsersList/>
        </div>
    )
}