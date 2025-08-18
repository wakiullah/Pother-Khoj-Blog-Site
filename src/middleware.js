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

    const isProtected = protectedPaths.some((regex) => regex.test(pathname));
    if (!isProtected) {
        return NextResponse.next();
    }
    const cookie = request.cookies.get('token');
    const user = await userVerify();
    if (!cookie || !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    //check if pathname is /login or /register redirect to home page if user is logged in
    // if (pathname === '/login' || pathname === '/register') {
    //     if (user && user.username) {
    //         return NextResponse.redirect(new URL('/', request.url));
    //     }
    // }
    try {
        if (user && user.username) {
            return NextResponse.next();
        }

    } catch (error) {
        console.error("Error decoding JWT:", error);
    }

    return NextResponse.redirect(new URL('/login', request.url));
}