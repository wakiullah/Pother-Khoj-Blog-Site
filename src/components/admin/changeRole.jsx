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
        // Log the clicked value to debug
        console.log('Selected value:', value);

        if (value === 'delete') {
            console.log(`/users/${user._id}`)
            const res = await apiRequest(`/users/${user._id}`, 'DELETE');
            if (res?.message) {
                showSuccess("User deleted!");
                router.refresh();
            } else {
                showError(res.error);
            }
        } else {
            // This is the crucial part: update the state
            setRole(value);

            try {
                const data = await apiRequest('/users', 'PATCH', {
                    role: value,
                    id: user._id
                });

                if (data.message) {
                    showSuccess("Role updated!");
                } else {
                    showError(data.error);
                }
                router.refresh();

            } catch (error) {
                console.error('Error updating role:', error);
                showError('Failed to update role');
            }
        }
    };

    return (
        <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Change Role">{role}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {user.role !== 'admin' ?
                    <SelectItem value="admin">Make Admin</SelectItem>
                    : <SelectItem value="user">Make User</SelectItem>}
                <SelectItem value="delete">Delete User</SelectItem>
            </SelectContent>
        </Select>
    );
}