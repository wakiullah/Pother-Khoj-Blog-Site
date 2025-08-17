import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
        <div className="font-bold text-2xl text-gray-800">Pother Khoj</div>
        <div>
            <Button variant={'ghost'} className="mr-2">
                <Link href={'/'}>
                    Home
                </Link>
            </Button>
            <Button variant={'ghost'} className="mr-2">
                <Link href={'/about'}>
                    About
                </Link></Button>
            <Button variant={'ghost'} className="mr-2">
                <Link href={'/contact'}>
                    Contact
                </Link>
            </Button>

        </div>
        <Button className="px-4 py-2  text-white rounded">
            <Link href="/login" className=" hover:underline">
                Login
            </Link>
        </Button>
    </nav>
);

export default Header;