import { dbConnect } from "@/lib/db";
import User from "@/model/User_Model";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req) {
    await dbConnect();
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        const token = sign(
            { username: user.name, email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: process.env.JWT_EXPIRATION || '7d' }
        );
        const response = NextResponse.json({ message: "Login successful", user }, { status: 200 });
        await cookies().set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days,
            sameSite: 'strict'
        })
        return response;
    } catch (err) {
        console.error("Error during login:", err);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}