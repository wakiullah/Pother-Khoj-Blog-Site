import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Avatar} from "@/components/common/avatar";

import {userVerify} from "@/utilitis/userVerify";


export default async function AdminHeader() {

    const user = await userVerify();


    return (
        <header className="bg-gray-800 text-white p-4  sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/dashboard/posts" className="hover:underline">Posts</Link></li>
                        <li><Link href="/dashboard/users" className="hover:underline">Users</Link></li>
                    </ul>
                </nav>
                <Avatar username={user.username} role={'admin'}/>
            </div>
        </header>
    );
}