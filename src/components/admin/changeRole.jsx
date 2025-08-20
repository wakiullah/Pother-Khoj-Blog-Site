'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ChangeRole({user}) {
    const [role, setRole] = useState(user.role);
    const router = useRouter();

    const handleRoleChange = async (newRole) => {
        setRole(newRole);
        try {
            const response = await fetch(`/api/users/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({role: newRole, id: user._id}),
            });
            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            const data = await response.json();
            router.refresh()


        } catch (error) {
            console.error('Error updating role:', error);
        }
    }

    return (
        <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Change Role">Change Role </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {user.role !== 'admin' ? <SelectItem value="admin">Make Admin</SelectItem> :
                    <SelectItem value="user">Make User</SelectItem>}
            </SelectContent>
        </Select>
    )
}