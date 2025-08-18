// src/components/common/avatar.jsx
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuContent
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export function Avatar({username, role}) {
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
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className='hover:bg-gray-200 dark:bg-gray-700 p-1 py-2 flex items-center mb-1'>
                        <Link href={`/${role}/profile`}> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='hover:bg-gray-200 dark:bg-gray-700 p-1 py-2 flex items-center mb-1'>
                        logout
                    </DropdownMenuItem>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}