import React from 'react';
import {Button} from "@/components/ui/button";

const Link = require('next/link');
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
            <p className="text-gray-500 mb-6 text-center">
                Sorry, the page you are looking for does not exist.
            </p>


            <Link
                href="/"
                className=""
            >
                <Button variant={'outline'}> Go Home</Button>
            </Link>
        </div>
    );
}