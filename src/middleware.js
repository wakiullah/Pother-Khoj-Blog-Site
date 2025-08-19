import {userVerify} from "@/utilitis/userVerify";

const jwt = require('jsonwebtoken');
const {NextResponse} = require('next/server');
const jose = require('jose')

export async function middleware(request) {
    const {pathname} = new URL(request.url);

    // Protect /dashboard, /dashboard/*, /user/*
    const protectedPaths = [
        /^\/dashboard(\/.*)?$/,
        /^\/user(\/.*)?$/
    ];
    const cookie = request.cookies.get('token');
    const user = await userVerify();

    if ((pathname === '/login' || pathname === '/signup') && user && user.username) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const isProtected = protectedPaths.some((regex) => regex.test(pathname));
    if (!isProtected) {
        return NextResponse.next();
    }

    if (!cookie || !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user && user.role !== 'admin' && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/user/profile', request.url));
    }


    try {
        if (user && user.username) {
            return NextResponse.next();
        }

    } catch (error) {
        console.error("Error decoding JWT:", error);
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};