'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/utils/toast";
import { apiRequest } from "@/utils/api";

export default function ChangeRole({ user }) {
    const [role, setRole] = useState(user.role);
    const router = useRouter();

    const handleRoleChange = async (value) => {
        if (value === 'delete') {
            const res = await apiRequest(`/users/${user._id}`, 'DELETE')
            console.log(res)
            if (res.message) {
                showSuccess("user deleted!")
                router.refresh();
            } else {
                showError(res.error)
            }

        } else {
            setRole(value);
            try {
                const data = await apiRequest('/users', 'PATCH', { role: user.role === 'user' ? 'admin' : 'user', id: user._id })
                if (data.message) {
                    showSuccess("Role updated!")
                } else {
                    showError(data.error)
                }
                router.refresh()


            } catch (error) {
                console.error('Error updating role:', error);
            }
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
                <SelectItem value="delete">Delete User</SelectItem>
            </SelectContent>

        </Select>
    )
}