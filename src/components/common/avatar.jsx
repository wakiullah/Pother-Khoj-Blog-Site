// src/components/common/avatar.jsx
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuContent
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/authentication";

export function Avatar({ username, role }) {
    const firstInitial = username ? username.charAt(0).toUpperCase() : "U";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center justify-center cursor-pointer">
                    {firstInitial}
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent align={"right"}
                className={'w-40 bg-gray-50 z-50 dark:bg-gray-700  rounded-lg shadow-lg text-gray-800 dark:text-gray-300 cursor-pointer gap-3'}>
                <DropdownMenuGroup className="p-2">
                    <DropdownMenuItem className="mb-3"
                    >
                        <Link className='hover:bg-gray-200 rounded-lg m dark:bg-gray-700 p-1 py-2 flex items-center mb-1'
                            href={`/user/profile`}> Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Button onClick={logOut} className={'w-full'}>
                            Logout
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}