'use server'
import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar} from "@/components/common/avatar";
import {userVerify} from "@/utilitis/userVerify";

const Header = async () => {

    const user = await userVerify();

    return (
        <nav className=" p-4 bg-gray-100 sticky top-0 z-50 shadow-sm">
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                <div className="font-bold text-2xl max-w-5xl text-gray-800">Pother Khoj</div>
                <div>
                    <Button variant={'ghost'} className="mr-2">
                        <Link href={'/'}>
                            Home
                        </Link>
                    </Button>
                    <Button variant={'ghost'} className="mr-2">
                        <Link href={'/posts'}>
                            Posts
                        </Link></Button>


                </div>
                {user ? <Avatar username={user.username} role={"user"}/> :
                    <Button className="px-4 py-2  text-white rounded">
                        <Link href="/login" className=" hover:underline">
                            Login
                        </Link>
                    </Button>}
            </div>
        </nav>
    )
};

export default Header;